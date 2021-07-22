import '../assets/scss/components/Header/header.css'

export default function HeaderSearch({handleSearch, search, setSearch}){
    return (
        <header className="p-4">
            <a href="/">
                <div className="text-center h1 font-weight-bold title">My<strong>Anime</strong>List</div>
            </a>
            <div className="d-flex justify-content-between">
                <a href="/favorite">
                    <div className="nav-item">
                        FAVORITE
                    </div>
                </a>
                <form action="" className="form-search d-inline-flex" onSubmit={handleSearch}>
                    <input type="search"
                    name="search" id="search" placeholder="Search..."
                    className="form-control" value={search}
                    onChange={e => {
                        setSearch(e.target.value)
                    }}/>
                </form>
            </div>
        </header>
    )
}