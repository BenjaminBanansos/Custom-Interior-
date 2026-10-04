export default function Page() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}`,
        }}
      />
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-gutter-mobile lg:px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-lg">
            <a
              className="flex items-center gap-space-xs text-on-surface"
              data-path="product-catalog"
              href="#"
            >
              <span className="font-headline-sm text-headline-sm tracking-tight">
                SMART DECOR
              </span>
              <span className="font-label-sm text-label-sm tracking-widest text-secondary uppercase pl-space-xs">
                Interiors
              </span>
            </a>
            <nav
              className="hidden xl:flex items-center gap-gutter"
              data-active-classes="text-on-surface font-title-md"
            >
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors tracking-wide uppercase"
                data-path="storefront"
                href="#"
              >
                Storefront
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors tracking-wide uppercase"
                data-path="product-catalog"
                href="#"
              >
                Product Categories &amp; Catalog
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors tracking-wide uppercase"
                data-path="inventory"
                href="#"
              >
                Inventory
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors tracking-wide uppercase"
                data-path="orders"
                href="#"
              >
                Orders
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors tracking-wide uppercase"
                data-path="partners"
                href="#"
              >
                Partners
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="hidden md:flex items-center bg-surface-container-low px-space-md py-space-xs rounded gap-space-xs">
              <span className="material-symbols-outlined text-outline text-lg">
                search
              </span>
              <input
                className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none w-64 lg:w-72"
                placeholder="Search catalog hierarchy, SKU, models..."
                type="text"
              />
            </div>
            <a
              className="hidden sm:inline-flex items-center justify-center bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider px-space-md py-space-sm rounded-lg hover:bg-surface-tint hover:text-on-primary transition-all shadow-[0_4px_12px_rgba(11,20,38,0.08)]"
              data-path="create-product"
              href="#"
            >
              <span className="material-symbols-outlined text-base mr-1">
                add
              </span>
              Create Product
            </a>
            <div className="flex items-center gap-space-sm pl-space-xs">
              <button
                className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-xl">
                  notifications
                </span>
              </button>
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WZi7f9YBpfgzn0EU8P8PLEKc8QlQRd7_L2pyYr64TTGzMBZwp8GoWlWNcO3SoyM-UCUf6VqgC7t3u28Qv2IEptmoEPks1-b1lUmla3us8hwGljN-0sW-P0LZhLz0beLk83Q0L5ifyj2z7lTU6Qc7VdmIXyVhXhMrDv94ui0U_vI1xDHaOpcaqDW45nwGInwW_Z4mNR-ipQTekyzZOL11KpCmWpZ1FbYAC0Sbe4Hmxp-ZT5-oIBUMt1gzpaoif-WuFdc-VaJeqic0A"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          {/* Top Breadcrumb & Return Context Bar */}
          <section className="w-full bg-surface-container-lowest px-gutter-mobile lg:px-margin py-space-sm shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
                <a
                  className="inline-flex items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors py-1"
                  href="#"
                >
                  <span className="material-symbols-outlined text-base">
                    arrow_back
                  </span>
                  <span>Back to All Categories</span>
                </a>
                <span className="text-outline-variant px-1">/</span>
                <span className="hover:text-on-surface cursor-pointer transition-colors">
                  Product Categories
                </span>
                <span className="text-outline-variant px-1">/</span>
                <span className="text-on-surface font-title-md">
                  Roller Shades
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Architectural Series 2025
                </span>
                <span className="text-outline-variant hidden sm:inline">•</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline">
                  Hierarchy Level 01
                </span>
              </div>
            </div>
          </section>
          {/* Category Hero & Architecture Statement */}
          <section className="w-full px-gutter-mobile lg:px-margin py-space-lg">
            <div className="max-w-7xl mx-auto">
              <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm relative overflow-hidden">
                {/* Subtle architectural backdrop water-mark */}
                <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none select-none text-on-surface">
                  <span className="material-symbols-outlined text-[240px]">
                    roller_shades
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg relative z-10">
                  <div className="max-w-3xl space-y-space-sm">
                    <div className="flex flex-wrap items-center gap-space-xs">
                      <span className="px-2.5 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-widest">
                        Master Category
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm tracking-wide">
                        58 SKUs Total
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                        Matter &amp; Zigbee 3.0 Certified
                      </span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                      Roller Shades
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      Precision-engineered single and dual roller assemblies
                      with laser-sealed edges, anodized extruded pocket profile,
                      and ultra-quiet brushless 24V DC Matter motorization.
                      Designed for seamless recessed ceiling pockets and
                      perimeter light-block channels.
                    </p>
                    <div className="pt-space-xs flex flex-wrap gap-x-space-lg gap-y-1 text-on-surface-variant font-body-sm text-body-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-base">
                          verified
                        </span>{" "}
                        0.2mm Micro-Slit Seam Tolerance
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-base">
                          volume_off
                        </span>{" "}
                        &lt; 28dB Whisper Drive
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-base">
                          square_foot
                        </span>{" "}
                        Max Span 4,800mm Single Tube
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-space-xs shrink-0">
                    <button className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary hover:bg-surface-tint font-label-md text-label-md uppercase tracking-wider px-space-lg py-space-sm rounded shadow-sm transition-all">
                      <span className="material-symbols-outlined text-base">
                        add
                      </span>
                      <span>Create Product in Roller Shades</span>
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider px-space-lg py-space-sm rounded transition-colors">
                      <span className="material-symbols-outlined text-base">
                        tune
                      </span>
                      <span>Hardware Specification Matrix</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Opacity Tier Selection Segment */}
          <section className="w-full px-gutter-mobile lg:px-margin">
            <div className="max-w-7xl mx-auto space-y-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    Step 1 — Optical Transmission
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Select an Opacity Tier
                  </h2>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Click any tier to filter architectural textile formulations
                  instantly.
                </p>
              </div>
              {/* Segmented Opacity Interactive Cards */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-sm"
                id="opacityTabsContainer"
              >
                {/* Tab: Translucent (Active Initially) */}
                <button
                  className="opacity-tier-btn text-left p-space-md rounded-xl transition-all relative overflow-hidden bg-primary-container text-on-primary shadow-md"
                  data-tier="translucent"
                  type="button"
                >
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-headline-sm text-headline-sm">
                      Translucent
                    </span>
                    <span className="tier-count px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-lowest/20 text-on-primary">
                      23 Products
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-secondary-fixed mb-space-xs">
                    15–25% Light Transmission
                  </p>
                  <p className="font-body-sm text-body-sm opacity-90 leading-snug">
                    Soft diffused solar glow, UV deflection, glare moderation
                    with day view preservation.
                  </p>
                  <div className="mt-space-md pt-space-xs flex items-center justify-between text-label-sm font-label-sm uppercase tracking-wider border-t border-on-primary/10">
                    <span className="inline-flex items-center gap-1 text-secondary-fixed">
                      <span className="material-symbols-outlined text-sm">
                        filter_vintage
                      </span>{" "}
                      Daylight Filter
                    </span>
                    <span className="tier-status flex items-center gap-1 font-semibold text-secondary-fixed">
                      <span className="material-symbols-outlined text-sm">
                        check_circle
                      </span>{" "}
                      Active Tier
                    </span>
                  </div>
                </button>
                {/* Tab: Room Darkening */}
                <button
                  className="opacity-tier-btn text-left p-space-md rounded-xl transition-all relative overflow-hidden bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low"
                  data-tier="darkening"
                  type="button"
                >
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-headline-sm text-headline-sm">
                      Room Darkening
                    </span>
                    <span className="tier-count px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-on-surface">
                      21 Products
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-secondary mb-space-xs">
                    2–5% Light Transmission
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                    High privacy and deep daytime dimout for bedrooms, screening
                    media lounges, and west-facing suites.
                  </p>
                  <div className="mt-space-md pt-space-xs flex items-center justify-between text-label-sm font-label-sm uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">
                        bedtime
                      </span>{" "}
                      Deep Dimout
                    </span>
                    <span className="tier-status text-outline text-label-sm">
                      Select Tier
                    </span>
                  </div>
                </button>
                {/* Tab: Blackout */}
                <button
                  className="opacity-tier-btn text-left p-space-md rounded-xl transition-all relative overflow-hidden bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low"
                  data-tier="blackout"
                  type="button"
                >
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-headline-sm text-headline-sm">
                      Blackout
                    </span>
                    <span className="tier-count px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-on-surface">
                      14 Products
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-secondary mb-space-xs">
                    0% Light Transmission
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                    100% Zero-Gap optical seal. Multi-layer blackout foam
                    backing for absolute darkroom isolation.
                  </p>
                  <div className="mt-space-md pt-space-xs flex items-center justify-between text-label-sm font-label-sm uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">
                        dark_mode
                      </span>{" "}
                      Complete Cutoff
                    </span>
                    <span className="tier-status text-outline text-label-sm">
                      Select Tier
                    </span>
                  </div>
                </button>
                {/* Tab: All Opacities */}
                <button
                  className="opacity-tier-btn text-left p-space-md rounded-xl transition-all relative overflow-hidden bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low"
                  data-tier="all"
                  type="button"
                >
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-headline-sm text-headline-sm">
                      All Opacities
                    </span>
                    <span className="tier-count px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-on-surface">
                      58 SKUs
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-secondary mb-space-xs">
                    Full Continuum (0–25%)
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                    Unrestricted catalog view across sheer, solar screens,
                    duplex dimouts, and optical blackout assemblies.
                  </p>
                  <div className="mt-space-md pt-space-xs flex items-center justify-between text-label-sm font-label-sm uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">
                        view_carousel
                      </span>{" "}
                      Master Index
                    </span>
                    <span className="tier-status text-outline text-label-sm">
                      Select Tier
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </section>
          {/* Filter & Specification Control Bar */}
          <section className="w-full px-gutter-mobile lg:px-margin pt-space-lg">
            <div className="max-w-7xl mx-auto">
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
                  {/* SKU Search within Category */}
                  <div className="flex-1 relative">
                    <span className="material-symbols-outlined text-outline absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">
                      search
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all"
                      id="shadeSearchInput"
                      placeholder="Search Roller Shade SKU, weave texture, VLT %, or motor model..."
                      type="text"
                    />
                  </div>
                  {/* Dynamic Specification Filter Group */}
                  <div className="flex flex-wrap items-center gap-space-xs">
                    {/* Motor Selection */}
                    <div className="relative">
                      <select
                        className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md pl-3 pr-8 py-2.5 rounded cursor-pointer transition-colors focus:outline-none"
                        id="motorFilterSelect"
                      >
                        <option value="all">Motor: All Drives</option>
                        <option value="manual">Manual Smooth-Clutch</option>
                        <option value="24v">24V DC Brushless Quiet</option>
                        <option value="matter">Zigbee / Matter Native</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-sm pointer-events-none">
                        expand_more
                      </span>
                    </div>
                    {/* Fabric Weave Selection */}
                    <div className="relative">
                      <select
                        className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md pl-3 pr-8 py-2.5 rounded cursor-pointer transition-colors focus:outline-none"
                        id="weaveFilterSelect"
                      >
                        <option value="all">Fabric Weave: All Styles</option>
                        <option value="linen">Architectural Linen Blend</option>
                        <option value="solar">
                          High-Performance Solar Screen
                        </option>
                        <option value="perforated">
                          Micro-Perforated Silk Loom
                        </option>
                        <option value="paper">Kyoto Washi Paper-Loom</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-sm pointer-events-none">
                        expand_more
                      </span>
                    </div>
                    {/* Sort Mechanism */}
                    <div className="relative">
                      <select
                        className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md pl-3 pr-8 py-2.5 rounded cursor-pointer transition-colors focus:outline-none"
                        id="sortSelect"
                      >
                        <option value="popular">Sort: Most Specified</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="vlt-desc">
                          Highest Light Transmission
                        </option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-sm pointer-events-none">
                        swap_vert
                      </span>
                    </div>
                    <button
                      className="p-2.5 text-on-surface-variant hover:text-on-surface rounded bg-surface-container-low hover:bg-surface-container transition-colors"
                      id="resetFiltersBtn"
                      title="Clear Filters"
                    >
                      <span className="material-symbols-outlined text-base">
                        filter_alt_off
                      </span>
                    </button>
                  </div>
                </div>
                {/* Filter context summary chips */}
                <div className="flex flex-wrap items-center justify-between text-body-sm text-body-sm text-on-surface-variant pt-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span
                      className="font-title-md text-title-md text-on-surface"
                      id="resultsCount"
                    >
                      Displaying 6 of 23
                    </span>
                    <span className="text-on-surface-variant">
                      translucent shades curated for sunlit open-plan
                      architectural spaces.
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs text-label-sm font-label-sm">
                    <span className="inline-flex items-center gap-1 text-secondary font-medium">
                      <span className="material-symbols-outlined text-sm">
                        tune
                      </span>{" "}
                      Dual Rollers Compatible
                    </span>
                    <span className="text-outline-variant">•</span>
                    <span className="text-on-surface-variant">
                      Motorized Pocket Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Product Catalog Grid - Isolated to Category/Selected Tier */}
          <section className="w-full px-gutter-mobile lg:px-margin py-space-lg">
            <div className="max-w-7xl mx-auto">
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md"
                id="productGrid"
              >
                {/* Product 1: Aura Linen */}
                <article
                  className="product-card group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  data-motor="matter"
                  data-price="240"
                  data-tier="translucent"
                  data-weave="linen"
                >
                  <div className="relative h-64 bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      data-alt="Aura linen translucent roller shade mounted in an architectural floor-to-ceiling modern minimalist living room with warm afternoon natural sunlight filtering gently through delicate natural oat weave fabric."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFZY3PSlVhJEiRdEojQwP_GheAAum1p0qqbHd-loxnr5NazEq12Xwwu1C156LJneFQ3TsCdg3px9NUC68AYKXe50zwSGIaJuLd2hQcK0-LdvGOSL8RSacR5V8uJNFxOiBRCJOd26ceaRXKfwOi-H9DfxwIHd5RLew97kJKcExcDd4EkGrjFYr7uDspfcgNfI53F38yJDvnHYiuNTVck8Fp8LX-qQzWDNLa1PM-0InYr4M09cgS8X8yjg"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        VLT 18%
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm tracking-wide">
                        3% Openness
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">
                        Matter DC
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm text-label-sm font-label-sm text-on-surface">
                      SKU:{" "}
                      <span className="font-semibold text-secondary">
                        RS-TR-0104
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                          Belgian Weave Series
                        </span>
                        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-xs text-secondary-container">
                            star
                          </span>
                          <span>4.9 (42 specs)</span>
                        </div>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Aura Linen Roller Shade
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Calibrated semi-opaque weave blending pure Belgian flax
                        with flame-retardant micro-polymer warp threads.
                      </p>
                      {/* Swatch Preview Dots */}
                      <div className="pt-2 flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-outline mr-1">
                          Tones:
                        </span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#EAE5D9] ring-2 ring-surface-container-low ring-offset-1"
                          title="Natural Flax"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#FAF7F0] ring-1 ring-surface-container"
                          title="Chalk White"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#D7D2C7] ring-1 ring-surface-container"
                          title="Oatmeal Greige"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#B8B0A2] ring-1 ring-surface-container"
                          title="Warm Travertine"
                        ></span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-sm border-t border-surface-container-low flex items-center justify-between gap-space-xs">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                          Starting at
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          $240
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          / unit
                        </span>
                      </div>
                      <button className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary hover:bg-surface-tint font-label-md text-label-md uppercase tracking-wider px-3.5 py-2.5 rounded transition-all shadow-sm">
                        <span>Configure Spec</span>
                        <span className="material-symbols-outlined text-base">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
                {/* Product 2: Nordic Sheer Solar Shade */}
                <article
                  className="product-card group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  data-motor="24v"
                  data-price="210"
                  data-tier="translucent"
                  data-weave="solar"
                >
                  <div className="relative h-64 bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      data-alt="Nordic sheer solar roller shade installed on ultra wide double-glazed windows overlooking a sunlit pine forest with minimalist pale oak interior furniture, clean linear architecture."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB-kDCDmw8zi3yGptEX6cohh0Vg_8jXWa_PBT74IRS45PB7hvTY2spO4Ef0GiAw5htuzIIaZXu_8n_pepMYveWpY6OApJMPiJYE_Kqo1qxJkaU1F5WVViZ5_6rzfFXJHUg2mTWctjx5rYzZM1DopeLsvVDaOZOb9guY9XqjSY_z-JFapupWdzxUihDiaJSbebSl9-1lOBE2TTtZWqTd5kSGMEB8ZFhli634cqRavlWVfcwU2-g5YP5rA"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        VLT 22%
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm tracking-wide">
                        5% Solar Openness
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                        24V UltraQuiet
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm text-label-sm font-label-sm text-on-surface">
                      SKU:{" "}
                      <span className="font-semibold text-secondary">
                        RS-TR-0109
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                          Solar Tech Architectural
                        </span>
                        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-xs text-secondary-container">
                            star
                          </span>
                          <span>5.0 (68 specs)</span>
                        </div>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Nordic Sheer Solar Shade
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        High-stability fiberglass core solar mesh preventing
                        optical distortion while reflecting 78% of incoming
                        solar heat.
                      </p>
                      {/* Swatch Preview Dots */}
                      <div className="pt-2 flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-outline mr-1">
                          Tones:
                        </span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#FFFFFF] ring-2 ring-surface-container-low ring-offset-1"
                          title="Crisp Studio White"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#E5E5E5] ring-1 ring-surface-container"
                          title="Silver Birch"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#9E9E9E] ring-1 ring-surface-container"
                          title="Anodized Pewter"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#2C2C2E] ring-1 ring-surface-container"
                          title="Obsidian Charcoal"
                        ></span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-sm border-t border-surface-container-low flex items-center justify-between gap-space-xs">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                          Starting at
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          $210
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          / unit
                        </span>
                      </div>
                      <button className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary hover:bg-surface-tint font-label-md text-label-md uppercase tracking-wider px-3.5 py-2.5 rounded transition-all shadow-sm">
                        <span>Configure Spec</span>
                        <span className="material-symbols-outlined text-base">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
                {/* Product 3: Kyoto Paper-Linen Shade */}
                <article
                  className="product-card group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  data-motor="matter"
                  data-price="295"
                  data-tier="translucent"
                  data-weave="paper"
                >
                  <div className="relative h-64 bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      data-alt="Kyoto paper-linen motorized roller shade with subtle washi textured fibrous veins illuminated by soft backlighting in an architectural Japanese-modern sanctuary dining pavilion."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvN5rfGG5nrMmVuLKtoVaDzaq5pWoGfg_LbrLlEgnw-pJh-5cp_Bg_O6VU4DKSIlNoKLhPjFPRMATsa8YZBYK1AgUYeWdcOh4Wjr5ieMkLRO4UhIvUuJ9M7eMtthcMT5K1j-lzE0AMMA5TN_0RGN1l2nWR63cMufWET_4OAAbgbJx2-LnQhqETsVWYa0QAp5RPFgTtqLC_naiNP8TUrhGr3FKMfpaYJ2Y37Qtk00yfzee7P-RuGOsB9w"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        VLT 14%
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm tracking-wide">
                        Ambient Glow
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">
                        Matter DC
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm text-label-sm font-label-sm text-on-surface">
                      SKU:{" "}
                      <span className="font-semibold text-secondary">
                        RS-TR-0218
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                          Artisan Textile Line
                        </span>
                        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-xs text-secondary-container">
                            star
                          </span>
                          <span>4.8 (31 specs)</span>
                        </div>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Kyoto Paper-Linen Shade
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Infused washi paper mulberry fibers bound with tensile
                        Japanese polyester yarn for organic shadow patterns.
                      </p>
                      {/* Swatch Preview Dots */}
                      <div className="pt-2 flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-outline mr-1">
                          Tones:
                        </span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#F5F2EB] ring-2 ring-surface-container-low ring-offset-1"
                          title="Mulberry Ecru"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#E0D9C8] ring-1 ring-surface-container"
                          title="Toasted Rice"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#CBC4B4] ring-1 ring-surface-container"
                          title="Dune Sand"
                        ></span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-sm border-t border-surface-container-low flex items-center justify-between gap-space-xs">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                          Starting at
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          $295
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          / unit
                        </span>
                      </div>
                      <button className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary hover:bg-surface-tint font-label-md text-label-md uppercase tracking-wider px-3.5 py-2.5 rounded transition-all shadow-sm">
                        <span>Configure Spec</span>
                        <span className="material-symbols-outlined text-base">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
                {/* Product 4: Calais Silk-Loom Shade */}
                <article
                  className="product-card group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  data-motor="matter"
                  data-price="270"
                  data-tier="translucent"
                  data-weave="perforated"
                >
                  <div className="relative h-64 bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      data-alt="Calais silk-loom roller shade diffusing dawn daylight over an expansive open marble kitchen island with warm bronze architectural fixtures and minimal styling."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj3NmNuWjsBFO1UG-2j5vc__yEZLevo4MwOke-hNXFKmxVmRrcSJNrPBI4PeKvdlPSEW5ZjpTnmvTby4YinPNeH5XWB26QsH5dWjpgUF3j-a4DvV6i_33_HHcUBwQIDxn5o-AcBnxWfSq1h_ZcWzbOZ-hnu6kJdwOp3mhv36beyl7934X2039LrWleUtXgZfF6_InrlsPrI3jYvATSloFXBvzoZ0OEmL2HlE5KjYmVw9NMv0K4TNN5sg"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        VLT 20%
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm tracking-wide">
                        Soft Diffuse
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">
                        Matter DC
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm text-label-sm font-label-sm text-on-surface">
                      SKU:{" "}
                      <span className="font-semibold text-secondary">
                        RS-TR-0310
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                          Heritage Weave Line
                        </span>
                        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-xs text-secondary-container">
                            star
                          </span>
                          <span>4.9 (53 specs)</span>
                        </div>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Calais Silk-Loom Shade
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Lustrous synthetic silk filaments spun on French
                        Jacquard looms for exceptional tactile depth and
                        daylight bounce.
                      </p>
                      {/* Swatch Preview Dots */}
                      <div className="pt-2 flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-outline mr-1">
                          Tones:
                        </span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#FAF5EE] ring-2 ring-surface-container-low ring-offset-1"
                          title="Pearl"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#EAE2D5] ring-1 ring-surface-container"
                          title="Champagne"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#CDC2AF] ring-1 ring-surface-container"
                          title="Raw Silk"
                        ></span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-sm border-t border-surface-container-low flex items-center justify-between gap-space-xs">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                          Starting at
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          $270
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          / unit
                        </span>
                      </div>
                      <button className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary hover:bg-surface-tint font-label-md text-label-md uppercase tracking-wider px-3.5 py-2.5 rounded transition-all shadow-sm">
                        <span>Configure Spec</span>
                        <span className="material-symbols-outlined text-base">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
                {/* Product 5: Geneva Fine Weave */}
                <article
                  className="product-card group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  data-motor="24v"
                  data-price="230"
                  data-tier="translucent"
                  data-weave="linen"
                >
                  <div className="relative h-64 bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      data-alt="Geneva fine weave shade hanging smoothly in high-ceiling modern architectural home office overlooking an alpine panorama with direct high-noon sun mitigated cleanly."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfEip__5k--4cRvs4cpwDbL11CIURZ2UiVEbEENqnSN-WPtlhfHl7EjYS80Uuj8tCqoowgoSMDv3sEKWKALTmM-FikGrFkQaFEUJpxN96snhQjjT0IRPWJDukAcegH9j3zI0jZbKy380AWCQ5_25bT3d0aLCBc47HDtHWnbnViFBU7WfcxbkF10q3qCHLYN01dmMANqAB7OOlAv5QQ-z5i44i2vVy1UJ7GU877gngrJdl-jKas0Wbdzw"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        VLT 16%
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm tracking-wide">
                        Micro-Perforated
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                        24V UltraQuiet
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm text-label-sm font-label-sm text-on-surface">
                      SKU:{" "}
                      <span className="font-semibold text-secondary">
                        RS-TR-0412
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                          Swiss Precision Series
                        </span>
                        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-xs text-secondary-container">
                            star
                          </span>
                          <span>4.7 (39 specs)</span>
                        </div>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Geneva Fine Weave
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Uniform micro-perforated density designed for executive
                        conference suites and high-lumen residential atriums.
                      </p>
                      {/* Swatch Preview Dots */}
                      <div className="pt-2 flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-outline mr-1">
                          Tones:
                        </span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#EDEDEB] ring-2 ring-surface-container-low ring-offset-1"
                          title="Optic Frost"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#D1D1CB] ring-1 ring-surface-container"
                          title="Pale Zinc"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#4E5055] ring-1 ring-surface-container"
                          title="Basalt Grey"
                        ></span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-sm border-t border-surface-container-low flex items-center justify-between gap-space-xs">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                          Starting at
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          $230
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          / unit
                        </span>
                      </div>
                      <button className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary hover:bg-surface-tint font-label-md text-label-md uppercase tracking-wider px-3.5 py-2.5 rounded transition-all shadow-sm">
                        <span>Configure Spec</span>
                        <span className="material-symbols-outlined text-base">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
                {/* Product 6: Vapour Architectural Sheer */}
                <article
                  className="product-card group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  data-motor="manual"
                  data-price="255"
                  data-tier="translucent"
                  data-weave="solar"
                >
                  <div className="relative h-64 bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      data-alt="Vapour architectural sheer roller shade screening sunset glare in a contemporary open-concept penthouse with uninterrupted cityscape horizon view visible through fabric."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUanUl2MPqb0Eh0AbW7dtOm9atVYPgGNhX-zrvSi8M5p6A-9NRUVJCCnApwn26ESIviowXDWKXJrAZqej14A2__Ryzzpon3ykHe1LJOsJD1NdfliO5P1c9iwy5JKyI5VqeF1DM4soP52CutYqjlplSdhWGO2pK8ttvt2CVvauyalvr1KxuBtv2uczjKkOEa2TtV0wtoxfvsVl6LDfUIkw5Hg_o3yCmSnDdxCqVX4twB_NTwuH-6VG45Q"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        VLT 25%
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm tracking-wide">
                        High-Clearance View
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                        Precision Manual
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm text-label-sm font-label-sm text-on-surface">
                      SKU:{" "}
                      <span className="font-semibold text-secondary">
                        RS-TR-0520
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                          Aero Mesh Collection
                        </span>
                        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-xs text-secondary-container">
                            star
                          </span>
                          <span>4.9 (61 specs)</span>
                        </div>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Vapour Architectural Sheer
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Featherlight structural monofilament yarn yielding
                        crystalline outward clarity while diffusing harsh
                        interior reflections.
                      </p>
                      {/* Swatch Preview Dots */}
                      <div className="pt-2 flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-outline mr-1">
                          Tones:
                        </span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#FAF9F5] ring-2 ring-surface-container-low ring-offset-1"
                          title="Vapour White"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#E3E2DD] ring-1 ring-surface-container"
                          title="Misted Stone"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full bg-[#8E8F94] ring-1 ring-surface-container"
                          title="Monolith Slate"
                        ></span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-sm border-t border-surface-container-low flex items-center justify-between gap-space-xs">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                          Starting at
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          $255
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          / unit
                        </span>
                      </div>
                      <button className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary hover:bg-surface-tint font-label-md text-label-md uppercase tracking-wider px-3.5 py-2.5 rounded transition-all shadow-sm">
                        <span>Configure Spec</span>
                        <span className="material-symbols-outlined text-base">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
          {/* Technical Spec & Architectural Integration Blueprint Strip */}
          <section className="w-full px-gutter-mobile lg:px-margin py-space-xl">
            <div className="max-w-7xl mx-auto bg-surface-container-low rounded-xl p-space-lg lg:p-space-xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    Engineered Tolerances
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Dual Roller Cassette &amp; Pocket Specs
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Our extrusion profiles support flush drywall ceiling
                    integration with Zero-Reveal bottom hems and pre-wired RS485
                    / Zigbee / PoE drops.
                  </p>
                  <div className="pt-space-xs">
                    <a
                      className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface hover:text-secondary underline underline-offset-4 uppercase tracking-wider transition-colors"
                      href="#"
                    >
                      <span>Download CAD &amp; Revit BIM Models</span>
                      <span className="material-symbols-outlined text-sm">
                        download
                      </span>
                    </a>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded shadow-sm space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-title-md text-on-surface">
                      Pocket Envelope
                    </span>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 bg-surface-container-high rounded text-on-surface-variant">
                      Dual 5" x 7"
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Minimum recessed depth: 127mm. Symmetrical housing
                    accommodates 1 Translucent + 1 Blackout roll in identical
                    coordinate plane.
                  </p>
                  <div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary font-medium">
                    <span className="material-symbols-outlined text-base">
                      check
                    </span>{" "}
                    No Light Bleed at Corner Miters
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded shadow-sm space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-title-md text-on-surface">
                      Motor Acoustics
                    </span>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 bg-surface-container-high rounded text-on-surface-variant">
                      Decibel: &lt; 28 dB
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Continuous field-oriented vector control motor with soft
                    stop/start curves. Compatible with Lutron, Crestron Home,
                    Control4, and Apple Home.
                  </p>
                  <div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary font-medium">
                    <span className="material-symbols-outlined text-base">
                      check
                    </span>{" "}
                    Native Matter Over Thread Available
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Interactive Tier Switching & Filter Orchestration Script */}
        </div>
      </main>
      <footer className="w-full bg-surface-container-lowest mt-space-xl py-space-lg shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
        <div className="w-full px-gutter-mobile lg:px-margin flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-col sm:flex-row items-center gap-space-md text-center sm:text-left">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
              SMART DECOR
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              © 2025 Smart Decor Home Interiors Architectural Systems. All
              rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-space-lg font-body-sm text-body-sm text-on-surface-variant">
            <a
              className="hover:text-on-surface transition-colors"
              data-path="storefront"
              href="#"
            >
              Public Store
            </a>
            <a
              className="hover:text-on-surface transition-colors"
              data-path="partners"
              href="#"
            >
              Architectural Network
            </a>
            <a
              className="hover:text-on-surface transition-colors"
              data-path="product-catalog"
              href="#"
            >
              Spec Sheet API
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
