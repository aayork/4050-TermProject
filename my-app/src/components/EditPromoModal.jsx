export function EditPromoModal({ promo }) {
  return (
    <div className="modal-box">
      <h1> Edit Promo</h1>
      <form>
        <input name="promoName" defaultValue={promo.name}></input>
      </form>
    </div>
  );
}
