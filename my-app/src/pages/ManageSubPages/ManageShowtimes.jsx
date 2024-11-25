import { Calendar } from "../../components/ui/calendar";

export function ManageShowtimes() {
  return (
    <div className="flex justify-center p-12">
      <div className="border-monkey-green border rounded-lg shadow-xl bg-white">
        <Calendar />
      </div>
    </div>
  );
}
