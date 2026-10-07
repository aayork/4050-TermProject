from datetime import datetime, timedelta
from django.db.models import Q
from .models import ShowTime, MovieRoom
from django.utils.timezone import make_aware, is_naive


def get_available_rooms(movie, date, time=None):
    """
    Finds available movie rooms for a given movie, date, and optional time.

    Args:
        movie (Movie): The movie object.
        date (datetime.date): The specific date to check availability.
        time (datetime.time, optional): The specific start time to check availability.

    Returns:
        list[MovieRoom]: A list of available movie rooms.
    """
    # Convert the movie's runtime to a timedelta
    movie_duration = timedelta(minutes=movie.runtime)

    # Define the start and end of the day
    day_start = datetime.combine(date, datetime.min.time())
    day_end = datetime.combine(date, datetime.max.time())

    # Ensure `day_start` and `day_end` are timezone-aware if using `USE_TZ`
    if is_naive(day_start):
        day_start = make_aware(day_start)

    if is_naive(day_end):
        day_end = make_aware(day_end)

    # Filter showtimes that overlap with the specified date
    showtimes = ShowTime.objects.filter(
        Q(startTime__date=date) | Q(endTime__date=date)
    ).order_by('startTime')

    # Group showtimes by movie room
    room_showtimes = {}
    for showtime in showtimes:
        if showtime.movieRoom_id not in room_showtimes:
            room_showtimes[showtime.movieRoom_id] = []
        room_showtimes[showtime.movieRoom_id].append(showtime)

    available_rooms = []

    # Check availability for each movie room
    for room in MovieRoom.objects.filter(is_active=True):
        if room.id not in room_showtimes:
            # If the room has no showtimes for the day, it's fully available
            if not time:  # If no specific time is provided, return the room
                available_rooms.append(room)
            else:
                # If a specific time is provided, check if the slot fits
                requested_start = datetime.combine(date, time)
                if is_naive(requested_start):
                    requested_start = make_aware(requested_start)
                requested_end = requested_start + movie_duration
                if requested_start >= day_start and requested_end <= day_end:
                    available_rooms.append(room)
            continue

        # Get the room's showtimes for the day
        room_schedule = room_showtimes[room.id]

        # Add artificial boundaries for easier gap checking
        room_schedule.insert(0, ShowTime(endTime=day_start))  # Start of the day
        room_schedule.append(ShowTime(startTime=day_end))     # End of the day

        # Check for gaps between consecutive showtimes
        for i in range(len(room_schedule) - 1):
            gap_start = room_schedule[i].endTime
            gap_end = room_schedule[i + 1].startTime

            # Ensure `gap_start` and `gap_end` are timezone-aware
            if is_naive(gap_start):
                gap_start = make_aware(gap_start)
            if is_naive(gap_end):
                gap_end = make_aware(gap_end)

            if time:
                # Check if the requested time fits in the gap
                requested_start = datetime.combine(date, time)
                if is_naive(requested_start):
                    requested_start = make_aware(requested_start)
                requested_end = requested_start + movie_duration
                if gap_start <= requested_start < gap_end and requested_end <= gap_end:
                    available_rooms.append(room)
                    break
            else:
                # Check if the movie can fit in any gap during the day
                if (gap_end - gap_start) >= movie_duration:
                    available_rooms.append(room)
                    break

    return available_rooms

