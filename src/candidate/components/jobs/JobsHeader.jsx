const filters = ["All", "Remote", "Hybrid", "Onsite"]

export default function JobsHeader({
  search,
  setSearch,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <div className="space-y-4">
      {/* Title + Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div>
          <h1 className="text-lg font-semibold">Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Explore roles matched to your skills
          </p>
        </div>

        {/* Right: Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search roles, companies..."
          className="w-full rounded-md border px-3 py-2 text-sm sm:w-64"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm transition
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              {filter}
            </button>
          )
        })}
      </div>
    </div>
  )
}
