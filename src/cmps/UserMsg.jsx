export function UserMsg({ userMsg }) {
  return (
    <section className={`user-msg ${userMsg}`}>
      {userMsg === 'success' ? 'A new array has been added to DB by other user' : ''}
    </section>
  );
}
