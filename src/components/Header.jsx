import "../assets/scss/components/Header/header.css";

export default function HeaderSearch({ handleSearch, search, setSearch }) {
  return (
    <header className="p-2 p-md-4">
      <a href="/">
        <div className="text-center h1 font-weight-bold title">
          My<strong>Anime</strong>List
        </div>
      </a>
      <a href="/favorite">
        <div className="nav-item">FAVORITE</div>
      </a>
    </header>
  );
}
