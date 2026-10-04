export default function Page() {
  return (
    <main>
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
        <div className="w-full px-gutter-mobile lg:px-margin pt-space-md pb-space-sm">
          <nav
            aria-label="Global Breadcrumb"
            className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase"
          >
            <a
              className="hover:text-on-surface transition-colors"
              data-path="storefront"
              href="#"
            >
              Smart Decor
            </a>
            <span className="text-outline text-xs">/</span>
            <a
              className="hover:text-on-surface transition-colors"
              data-path="product-catalog"
              href="#"
            >
              Architecture &amp; Collections
            </a>
            <span className="text-outline text-xs">/</span>
            <span className="text-secondary font-title-md text-label-sm">
              Hierarchy Management
            </span>
          </nav>
        </div>
        <div className="flex flex-col w-full">
          {/*  Top Command & Architecture Overview Bar  */}
          <section className="w-full px-gutter-mobile lg:px-margin pt-space-xs pb-space-lg">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div className="space-y-space-xs max-w-3xl">
                <div className="flex items-center gap-space-xs">
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                    Catalog Topology v4.2
                  </span>
                  <span className="text-outline text-xs">•</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    3-Tier Precision Hierarchy
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Product Categories &amp; Hierarchy
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Select an architectural shade category to examine optical
                  tiers and fabrication models. Enforced structure:{" "}
                  <span className="text-on-surface font-title-md text-body-sm font-semibold">
                    Master Category → Opacity Filter (Translucent, Room
                    Darkening, Blackout) → Specific SKU Specifications
                  </span>
                  .
                </p>
              </div>
              {/*  Action Palette  */}
              <div className="flex items-center gap-space-sm flex-shrink-0">
                <button
                  className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest text-on-surface shadow-sm rounded-lg hover:bg-surface-container-low transition-all text-body-sm font-label-md"
                  type="button"
                >
                  <span className="material-symbols-outlined text-base text-outline">
                    tune
                  </span>
                  <span className="uppercase tracking-wider">
                    Hierarchy Audit
                  </span>
                </button>
                <button
                  className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary-container text-on-primary rounded-lg shadow-md hover:bg-surface-tint transition-all font-label-md text-label-md uppercase tracking-wider"
                  id="open-create-drawer-btn"
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">
                    add_circle
                  </span>
                  <span>+ Create Product</span>
                </button>
              </div>
            </div>
          </section>
          {/*  Level 1: Category Strip / Architectural Ribbon  */}
          <section className="w-full px-gutter-mobile lg:px-margin pb-space-lg">
            <div className="flex items-center justify-between pb-space-xs mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                  Level 01
                </span>
                <span className="text-outline text-xs">/</span>
                <span className="font-title-md text-title-md text-on-surface">
                  Master Shade System (7 Categories)
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Active:{" "}
                <span className="text-secondary font-title-md">
                  Roller Shades (58 SKUs)
                </span>
              </span>
            </div>
            {/*  Category Scroller / Bento Tiles  */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-space-sm">
              {/*  01 Roller Shades (Active)  */}
              <div className="group relative flex flex-col justify-between p-space-sm rounded-xl bg-surface-container-lowest shadow-md ring-1 ring-secondary/40 cursor-pointer transition-all hover:shadow-lg">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Minimalist floor to ceiling sheer roller shades in a high-rise luxury loft overlooking a sunlit metropolitan horizon, neutral travertine tones, warm natural sunlight, architectural editorial photography"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzwgf2D9iwHrCvWbmyoEy_yL8XE9hoX0JgCzK4YTFU2tvJKwJbTwT-XyW3zSsqqWbhYVZXMrbEBJ2WsnclXseNS4NC2-BdbAjm129d_DE-NUDiLbuzTJ48OmB83XfGDz6esoYMhM19dGhIv1U1EMUYzlEdEJP6m3hgwZy_d2W-9izETrxqj9cID2i8NU0axUbUkYiUDVw5GqxfGHdDU6-DDV2W1rrAocGLAadxPW2F7nUYy5NsIcaytA"
                  />
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-primary-container/85 text-on-primary font-label-sm text-[10px] tracking-widest uppercase">
                    Active
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-body-md text-on-surface font-semibold tracking-tight">
                      Roller Shades
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  </div>
                  <p className="font-label-sm text-label-sm text-outline mt-0.5">
                    58 Total Items
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider">
                    <span>3 Tiers</span>
                    <span>•</span>
                    <span className="text-secondary">Motor / Manual</span>
                  </div>
                </div>
              </div>
              {/*  02 Duo Stripes (Zebra Blinds)  */}
              <div className="group relative flex flex-col justify-between p-space-sm rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md cursor-pointer transition-all">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Modern zebra blinds duo stripes dual fabric bands open in luxury penthouse with minimalist curved boucle white sofa and low marble coffee table, soft architectural morning light"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZlvyUHK88ul6HLL_uuJFkUdNsG1ya-Ze_W-CHgkOQRqB8zO_pFFBWhApBcANOTH0HgbXLxeX4WKbO8UZbjXf5a6t1bM5Gf9jBGJDhK5GBFAUZOwRw4F9OuFxBPY5EGbiB8slm26f2r79zMMX_DwrPmbvijXgEwOyer7U54p31qGRl3xSoxOEG5ZdT_rG059l6wPfOzcfqhznOjmBSOC60VW5-Eo3h7gbSCr1oSKfAQS3_NjlARKkUEA"
                  />
                </div>
                <div>
                  <h3 className="font-title-md text-body-md text-on-surface font-semibold tracking-tight group-hover:text-secondary transition-colors">
                    Duo Stripes
                  </h3>
                  <p className="font-label-sm text-label-sm text-outline mt-0.5">
                    Zebra • 46 Items
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider">
                    <span>Dual Banding</span>
                  </div>
                </div>
              </div>
              {/*  03 Honeycomb Blinds  */}
              <div className="group relative flex flex-col justify-between p-space-sm rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md cursor-pointer transition-all">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Architectural cellular cellular honeycomb shades installed inside wood framed minimalist study with garden view, warm oak ceiling and natural linen textures"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvceULeY5Ov0pxM9F6bU4-xzlw0KBH25UtUSznUUmN6YyCxM6Ec4XjveDfUW6c_UKV9DlV3xFVkHpUmNnnsQ2ZeP22AaXIU6vIt_6Aw-dY8oCk7wMVOFjRYRImuVQ-VaVjMnPKrl73yrtYFUFiiTviny1xEZsmKvc9QdMxQRm-NiCSPyE83KOdRKTJzCl4v3cVW-hUgSgbhx109Nsm67felN0pjmYy5H1-B_xDdlefHBkbjWqOcbtFlg"
                  />
                </div>
                <div>
                  <h3 className="font-title-md text-body-md text-on-surface font-semibold tracking-tight group-hover:text-secondary transition-colors">
                    Honeycomb
                  </h3>
                  <p className="font-label-sm text-label-sm text-outline mt-0.5">
                    Cellular • 32 Items
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider">
                    <span>Thermal Cell</span>
                  </div>
                </div>
              </div>
              {/*  04 Roman Shades  */}
              <div className="group relative flex flex-col justify-between p-space-sm rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md cursor-pointer transition-all">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Custom soft fold cascade Roman shades in Belgian washed linen interior, warm neutral minimalist living room with diffuse sky light"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_Yc4YSCLE_Oont0EpvX5U6tJESB-tBCq3fFwKHuYXvuGgKRmmuOQ7Mgm8c8hE0UUKUJyBsC5fBvLhWUODMtwpr1BDXW0hOQ9sE6BR3appBhY_2Y9zHeavXGJLM3WBL9DuIE4WJJOB0eLGOOqnq4qaK8i7GR2Plwmm8Z4BskapYHooLwNICZtR0ik_Ex2MkSLAD8z8X2XSI8mXAz80JHXXrmEQtHU5xnQgGa__lnbSZT-dfRrId95Mxg"
                  />
                </div>
                <div>
                  <h3 className="font-title-md text-body-md text-on-surface font-semibold tracking-tight group-hover:text-secondary transition-colors">
                    Roman Shades
                  </h3>
                  <p className="font-label-sm text-label-sm text-outline mt-0.5">
                    Flat &amp; Fold • 18 Items
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider">
                    <span>Textured Weave</span>
                  </div>
                </div>
              </div>
              {/*  05 Vertical Drapery Shades  */}
              <div className="group relative flex flex-col justify-between p-space-sm rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md cursor-pointer transition-all">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Vertical sheer drapery smart sheer vanes rotating 180 degrees over grand sliding patio doors in expansive contemporary villa"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0ODWtdJjXjH8-uwgX6yQP6NGQplVTuKWIoVKq6INrMPuijZnKMK56PG2drREQwOf2x-oCgCyEGtVtoabCui7JZtiTE9Y8K53-E9LhlL7iKX3-1__69TFIXnIfZcta1c5Lhc1tFg2cGp-Yz-5Eq-bm1l6EHO8ONS5ysnbMe8TRN-96FNT0hEc6axM8e1IKHSI7hpHCTk3NSejmhF9BzYM3-8jjUHNSVnbav4TEpPSzUrmsGqiO7MbavQ"
                  />
                </div>
                <div>
                  <h3 className="font-title-md text-body-md text-on-surface font-semibold tracking-tight group-hover:text-secondary transition-colors">
                    Vertical Drapery
                  </h3>
                  <p className="font-label-sm text-label-sm text-outline mt-0.5">
                    Smart Vane • 14 Items
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider">
                    <span>180° Traverse</span>
                  </div>
                </div>
              </div>
              {/*  06 Shangrila Shades  */}
              <div className="group relative flex flex-col justify-between p-space-sm rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md cursor-pointer transition-all">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Shangri-la style triple shade horizontal fabric vanes floating between two sheer facings in sunny refined sanctuary with sculptural ceramics"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeY0-wbvnLIALwdFjlqC9jI_ehMb5JsOnn468_0pSgoz7-oCK8hiI1EJbo8ij7dv_54t0SfldEy0KKFnPokDMykxa1CpYw83Umkzpr13-wLGISpD3EKrTiXp-uPuW5oFKZh81IzJY-u-V_V-JaDC6IZ5wDSPfiFacOOlTs4N7_jQVUjVz4pCWJFLSnv_qcI5uDlHOM8jmy0CyegkrgvGjItz-onqCt1MzzqE6NF9ZG8_HXNl0NBurwhg"
                  />
                </div>
                <div>
                  <h3 className="font-title-md text-body-md text-on-surface font-semibold tracking-tight group-hover:text-secondary transition-colors">
                    Shangrila
                  </h3>
                  <p className="font-label-sm text-label-sm text-outline mt-0.5">
                    Triple Sheer • 12 Items
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider">
                    <span>Suspended Vane</span>
                  </div>
                </div>
              </div>
              {/*  07 Butterfly Roller Shades  */}
              <div className="group relative flex flex-col justify-between p-space-sm rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md cursor-pointer transition-all">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Architectural dual butterfly roller mechanism with alternating privacy wing screens in modern architectural concrete and oak bedroom"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_R9ZM0f2fFxoPRM247jYxkcMz83xWr2jGSIxvkOQ8dAQ3mGx0AllkWun1ksyL35xQu1ERE6A8a8yO_frW3H-HD25Pqz8l4l02GqDgTDHWTcfJE0uACQM_ODDA-8FYTecf2bD7dIqI-2CApbmIC59lKz_QLAAFvCsgGbqW0PJ9UwotW9olI3u43PKjtCK_uSELtwqJiFOp-mslx7GrqdNvoQW0eVg-89YsZFNilohQUxEXjnrNNheHMQ"
                  />
                </div>
                <div>
                  <h3 className="font-title-md text-body-md text-on-surface font-semibold tracking-tight group-hover:text-secondary transition-colors">
                    Butterfly Roller
                  </h3>
                  <p className="font-label-sm text-label-sm text-outline mt-0.5">
                    Dual Screen • 9 Items
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider">
                    <span>Articulating</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*  Level 2: Active Category Focus + Opacity Tiers Architecture  */}
          <section className="w-full px-gutter-mobile lg:px-margin pb-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl p-space-md lg:p-space-lg shadow-sm space-y-space-md">
              {/*  Section Sub-Header with Master Specs  */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-space-md gap-space-md">
                <div className="space-y-1">
                  <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">
                    <span>Category 02 of 07 Selected</span>
                    <span>•</span>
                    <span className="text-on-surface">
                      Standard Architectural Specification
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                    Roller Shades System Framework
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
                    Precision engineered single and dual roller assemblies with
                    laser-sealed edges, anodized extruded aluminum fascias
                    (75mm/100mm pocket profile), and zero-friction spring-assist
                    or ultra-quiet brushless 24V DC Matter motorization.
                  </p>
                </div>
                {/*  Light Transmittance Reference Index  */}
                <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded-xl">
                  <div className="flex flex-col text-right">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                      Optical Transmission
                    </span>
                    <span className="font-title-md text-body-sm text-on-surface">
                      3 Standardized Grades
                    </span>
                  </div>
                  <div className="w-px h-8 bg-surface-container-high"></div>
                  <div className="flex items-center gap-2">
                    <div className="text-center px-2 py-1 bg-surface-container-lowest rounded">
                      <span className="block text-[10px] font-label-md text-secondary font-semibold">
                        15-25%
                      </span>
                      <span className="block text-[9px] text-outline font-label-sm uppercase">
                        Translucent
                      </span>
                    </div>
                    <div className="text-center px-2 py-1 bg-surface-container-lowest rounded">
                      <span className="block text-[10px] font-label-md text-on-surface font-semibold">
                        2-5%
                      </span>
                      <span className="block text-[9px] text-outline font-label-sm uppercase">
                        Room Dark
                      </span>
                    </div>
                    <div className="text-center px-2 py-1 bg-surface-container-lowest rounded">
                      <span className="block text-[10px] font-label-md text-primary font-semibold">
                        0% VLT
                      </span>
                      <span className="block text-[9px] text-outline font-label-sm uppercase">
                        Blackout
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/*  Level 02: Opacity Selector Tabs Strip  */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm pt-space-xs">
                <div
                  className="flex flex-wrap items-center gap-space-xs"
                  id="opacity-filter-tabs"
                >
                  <button
                    className="opacity-tab px-space-md py-space-xs rounded-full font-label-md text-label-md uppercase tracking-wider bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-all"
                    type="button"
                  >
                    All Opacities (58)
                  </button>
                  <button
                    className="opacity-tab active px-space-md py-space-xs rounded-full font-label-md text-label-md uppercase tracking-wider bg-primary-container text-on-primary shadow-sm transition-all flex items-center gap-1.5"
                    type="button"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Translucent (23 Items)
                  </button>
                  <button
                    className="opacity-tab px-space-md py-space-xs rounded-full font-label-md text-label-md uppercase tracking-wider bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                    type="button"
                  >
                    Room Darkening (21 Items)
                  </button>
                  <button
                    className="opacity-tab px-space-md py-space-xs rounded-full font-label-md text-label-md uppercase tracking-wider bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                    type="button"
                  >
                    Blackout (14 Items)
                  </button>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-base text-secondary">
                    filter_vintage
                  </span>
                  <span>
                    Openness Factor: <strong>1% to 5% Sheer Solar</strong>
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/*  Level 3: Products Categorized Strictly under Category -> Opacity (Translucent Focus)  */}
          <section className="w-full px-gutter-mobile lg:px-margin pb-space-xl">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-baseline gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Translucent Roller Shades
                </h3>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest pl-space-xs">
                  (Sub-Tier 01 • 23 Formulations)
                </span>
              </div>
              <div className="flex items-center gap-space-sm text-body-sm text-on-surface-variant font-body-sm">
                <span>
                  Displaying: <strong>4 Curated Models</strong>
                </span>
                <span className="text-outline">/</span>
                <a
                  className="text-secondary font-title-md hover:underline inline-flex items-center gap-0.5"
                  href="#"
                >
                  View All 23 Specifications{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            {/*  Product Grid: Translucent Tier  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
              {/*  Translucent Product 1  */}
              <div className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Aura Linen Translucent Roller Shade installed in a sun-drenched architectural dining room with warm limestone floor, natural sheer daylight filtering softly"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-lPEATFkEZhhSJ9BCagnmlC5ir36hkWJYqFzBx2CiCBnxm2q4EOnbM3zA-uuE2HBJlenjYizJ6AruwCOuJlfha-micZ-ibLN7D5Dh6xZSc8GvsyEz-m3UGlH5-hc6FBNGPdd9UmzThCSZUDJPGHqVJI8GK5UoWEqt8Dq_sweB_Zn3iC_9ZVWhiwK8YqlLNpXDfnImeVQvtZN26SAPGEdT8K5eflB-fVuNgjjL2punt-g5zRdLDShLWw"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-[10px] uppercase tracking-wider text-on-surface">
                    VLT: 18% • 3% Open
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary bg-primary-container/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs font-label-sm">
                    <span>SKU: RS-TR-0104</span>
                    <span className="text-secondary">Matter / Zigbee 3.0</span>
                  </div>
                </div>
                <div className="p-space-md flex flex-col flex-grow justify-between space-y-space-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-label-md text-secondary tracking-widest uppercase">
                      Roller Shades → Translucent
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                      Aura Linen Roller Shade
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Belgian flax woven with ultra-fine solar filament for
                      luminous architectural light balance.
                    </p>
                  </div>
                  <div className="space-y-space-xs pt-space-xs">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full bg-[#f4f1ea] shadow-xs"
                        title="Alabaster"
                      ></span>
                      <span
                        className="w-3 h-3 rounded-full bg-[#dfd6c8] shadow-xs"
                        title="Warm Sand"
                      ></span>
                      <span
                        className="w-3 h-3 rounded-full bg-[#ebebeb] shadow-xs"
                        title="Chalk"
                      ></span>
                      <span
                        className="w-3 h-3 rounded-full bg-[#cfd5d7] shadow-xs"
                        title="Mist"
                      ></span>
                      <span className="text-[11px] font-label-sm text-outline pl-1">
                        +2 shades
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="font-body-sm text-body-sm text-outline">
                        Starting at
                      </span>
                      <span className="font-title-md text-title-md text-on-surface">
                        $240{" "}
                        <span className="text-xs text-outline font-normal">
                          / unit
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="pt-space-xs flex items-center gap-2">
                    <button
                      className="w-full py-2 bg-surface-container-low hover:bg-primary-container hover:text-on-primary text-on-surface font-label-md text-label-md uppercase tracking-wider rounded transition-all"
                      type="button"
                    >
                      Configure Spec
                    </button>
                    <button
                      className="p-2 text-outline hover:text-on-surface rounded bg-surface-container-low"
                      title="Quick Spec Sheet"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">
                        download
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/*  Translucent Product 2  */}
              <div className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Nordic Sheer Solar Roller Shade high precision fabric against modern black metal floor-to-ceiling windows showing verdant courtyard garden view"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM-0rDQf28xysO9j8uron8VZnCUtcsVipe0cdqY4U-IpGT4TK7XG1xfttKd-8YP-KEF1xrdQGG4T0i4J68Ln0lDamapxQMzRdr8qNBZPpGbE27eOZDypJJEH4SMWLA9pXM4Q-ulBnsyoayxZpE314vGijz5f-q3lBXDEEzm6tTa3y5gtSvKAVKb_NlA-CeWnQtPJUIOiXDjgR9ounucQURjv2xcegMPp7u2sk0Vzw5It1Uiu_sLO3mnQ"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-[10px] uppercase tracking-wider text-on-surface">
                    VLT: 22% • 5% Solar
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary bg-primary-container/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs font-label-sm">
                    <span>SKU: RS-TR-0109</span>
                    <span className="text-secondary">Recessed Pocket</span>
                  </div>
                </div>
                <div className="p-space-md flex flex-col flex-grow justify-between space-y-space-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-label-md text-secondary tracking-widest uppercase">
                      Roller Shades → Translucent
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                      Nordic Sheer Solar Shade
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      High-definition micro-weave designed for architectural
                      glazing to maintain outer visual clarity.
                    </p>
                  </div>
                  <div className="space-y-space-xs pt-space-xs">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full bg-[#e8e6e1]"
                        title="Pearl"
                      ></span>
                      <span
                        className="w-3 h-3 rounded-full bg-[#c2bdb5]"
                        title="Pewter Sheer"
                      ></span>
                      <span
                        className="w-3 h-3 rounded-full bg-[#52504c]"
                        title="Charcoal Solar"
                      ></span>
                      <span className="text-[11px] font-label-sm text-outline pl-1">
                        3 solar weaves
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="font-body-sm text-body-sm text-outline">
                        Starting at
                      </span>
                      <span className="font-title-md text-title-md text-on-surface">
                        $210{" "}
                        <span className="text-xs text-outline font-normal">
                          / unit
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="pt-space-xs flex items-center gap-2">
                    <button
                      className="w-full py-2 bg-surface-container-low hover:bg-primary-container hover:text-on-primary text-on-surface font-label-md text-label-md uppercase tracking-wider rounded transition-all"
                      type="button"
                    >
                      Configure Spec
                    </button>
                    <button
                      className="p-2 text-outline hover:text-on-surface rounded bg-surface-container-low"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">
                        download
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/*  Translucent Product 3  */}
              <div className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Kyoto Woven Paper-Linen Roller Shade with subtle textured horizontal striations diffusing amber sunset light into an architectural library"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiEhKhJVzq2JWRFSvs250od-2vRQO58JMltJcIEDhtRgyElRspS39_TI_rq2IZnzbN6v2QosbQ1691MgmXJKsnIj_f4GYo6vJfVB9_8upCqgVdoqHxYzyok03JYkCISYE4DhitPIx2VhmEfH3MFsE12mA7QJyTfe-X4bSMaangnnC3epxK5VDG2FR25zeqGDgBQYobLG5nFeBnUjG7VTn_JMVdp31atCovtsvOb06v8XcODQekqJYXGg"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-[10px] uppercase tracking-wider text-on-surface">
                    VLT: 14% • Ambient Glow
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary bg-primary-container/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs font-label-sm">
                    <span>SKU: RS-TR-0218</span>
                    <span className="text-secondary">Concealed Hembar</span>
                  </div>
                </div>
                <div className="p-space-md flex flex-col flex-grow justify-between space-y-space-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-label-md text-secondary tracking-widest uppercase">
                      Roller Shades → Translucent
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                      Kyoto Paper-Linen Shade
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Japanese washi paper ribbons braided with organic combed
                      linen yarns for organic tactile dispersion.
                    </p>
                  </div>
                  <div className="space-y-space-xs pt-space-xs">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full bg-[#f0ebd9]"
                        title="Raw Washi"
                      ></span>
                      <span
                        className="w-3 h-3 rounded-full bg-[#d6c9b3]"
                        title="Smoked Tea"
                      ></span>
                      <span
                        className="w-3 h-3 rounded-full bg-[#8c8275]"
                        title="Slate Bark"
                      ></span>
                      <span className="text-[11px] font-label-sm text-outline pl-1">
                        +4 artisan tones
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="font-body-sm text-body-sm text-outline">
                        Starting at
                      </span>
                      <span className="font-title-md text-title-md text-on-surface">
                        $295{" "}
                        <span className="text-xs text-outline font-normal">
                          / unit
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="pt-space-xs flex items-center gap-2">
                    <button
                      className="w-full py-2 bg-surface-container-low hover:bg-primary-container hover:text-on-primary text-on-surface font-label-md text-label-md uppercase tracking-wider rounded transition-all"
                      type="button"
                    >
                      Configure Spec
                    </button>
                    <button
                      className="p-2 text-outline hover:text-on-surface rounded bg-surface-container-low"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">
                        download
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/*  Translucent Product 4  */}
              <div className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Calais Milled Silk-Loom Roller Shade in modern luxury bedroom with gentle diffused cloud morning light, calm serene atmosphere"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3v_-nzTK7CcYTaVj2uUfebEZPEmGAVAcgxSGR3ol0ouy7KyZh6bAYXzwJDzIfnFn56udAeFMvaf9RUZsDTb_pOEQOmDDC17ivNKxmP0JjrkP34ZUk7gZLmMFWvcn9AfgoTHqISIcAFnsGYabfZ0I5RrQ5g9tCnp5f1Y_-y09nZlSq2EIKxFfCg0Ab4DRyJjQr7xEa66fxinXev4tqPAtPL_kZUUz46MSfmbVsjvZ63FAPYf5KRMDCCw"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-[10px] uppercase tracking-wider text-on-surface">
                    VLT: 20% • Soft Diffuse
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary bg-primary-container/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs font-label-sm">
                    <span>SKU: RS-TR-0310</span>
                    <span className="text-secondary">Brushless 24V DC</span>
                  </div>
                </div>
                <div className="p-space-md flex flex-col flex-grow justify-between space-y-space-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-label-md text-secondary tracking-widest uppercase">
                      Roller Shades → Translucent
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                      Calais Silk-Loom Shade
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Satin spun filament weave generating a pearlescent sheen
                      without glare or hot-spots.
                    </p>
                  </div>
                  <div className="space-y-space-xs pt-space-xs">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full bg-[#f7f5f0]"
                        title="Ivory Spun"
                      ></span>
                      <span
                        className="w-3 h-3 rounded-full bg-[#e3ded4]"
                        title="Oat Sheen"
                      ></span>
                      <span
                        className="w-3 h-3 rounded-full bg-[#a39a8c]"
                        title="Taupe Luster"
                      ></span>
                      <span className="text-[11px] font-label-sm text-outline pl-1">
                        French milled
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="font-body-sm text-body-sm text-outline">
                        Starting at
                      </span>
                      <span className="font-title-md text-title-md text-on-surface">
                        $270{" "}
                        <span className="text-xs text-outline font-normal">
                          / unit
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="pt-space-xs flex items-center gap-2">
                    <button
                      className="w-full py-2 bg-surface-container-low hover:bg-primary-container hover:text-on-primary text-on-surface font-label-md text-label-md uppercase tracking-wider rounded transition-all"
                      type="button"
                    >
                      Configure Spec
                    </button>
                    <button
                      className="p-2 text-outline hover:text-on-surface rounded bg-surface-container-low"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">
                        download
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*  Secondary & Tertiary Opacity Previews (Room Darkening & Blackout under Roller Shades)  */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
              {/*  Sub-Tier 02 Preview: Room Darkening  */}
              <div className="p-space-lg bg-surface-container-lowest rounded-2xl shadow-sm space-y-space-md">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                        Sub-Tier 02
                      </span>
                      <span className="text-outline text-xs">•</span>
                      <span className="font-label-sm text-label-sm text-on-surface uppercase">
                        2-5% VLT
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">
                      Room Darkening Roller Shades (21 Items)
                    </h4>
                  </div>
                  <button
                    className="text-body-sm font-label-md text-on-surface hover:text-secondary uppercase tracking-wider flex items-center gap-1"
                    type="button"
                  >
                    Expand Tier{" "}
                    <span className="material-symbols-outlined text-sm">
                      unfold_more
                    </span>
                  </button>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Engineered dense textiles and composite yarn matrices designed
                  to deliver subdued daytime ambience and evening seclusion
                  without complete darkness.
                </p>
                {/*  Mini Preview Cards  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="flex gap-space-sm p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Meridian Textured Weave room darkening roller shade fabric macro closeup with dense architectural cross-hatch fibers"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9XxDug4YNcebqWTPTUYGd04-bLC5E-hhogafwWoEcEGcyS_k-bcq9Sp9TMCl0emOAsnH2J4doJOTOSdg4WLvyc131bGuxiIsnd-kmlT__MMEdiOkKbweZWFUFOoMRevtm5KhRQlhRcQBqWY10dfO39UoNCMtuBe4HT_f3nMAI-GCyEAO_mEd-cCYYCVp0QI6XQZSABmOY6ApD-mcThpytyslb5XgDSWmmsvAo9A0JQUpSdYgyh72SjQ"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-label-sm text-outline">
                        SKU: RS-RD-0442
                      </span>
                      <h5 className="font-title-md text-body-sm text-on-surface font-semibold">
                        Meridian Weave
                      </h5>
                      <span className="text-xs text-on-surface-variant mt-0.5">
                        Dual-Tone 3% VLT • $265
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-space-sm p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Vesper Twilight Screen dense room darkening shade fabric swatches in charcoal and espresso tones"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfhw8KjbkqcogHFdlnq95mO46-NtVZsr0UuJbNxQE0cqqy-wIfFg3JVMLbuBCEAEMGFigqEADC3NkLd44M101waFxpZfxv7hI9JEP6kZwWvbKHqqBcPytnqC-NpWwtXgbHyn5C_zPePZCeE5Z_86A_uUPJAfDtnHwUkdRG2A2l7dF810lFD6Ur0RspcxL_cHmJe_8F-PSPBzy22FMC-dH41dbpPEGCajUMEh7q1U2FhRfa8jsLHAcQSQ"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-label-sm text-outline">
                        SKU: RS-RD-0488
                      </span>
                      <h5 className="font-title-md text-body-sm text-on-surface font-semibold">
                        Vesper Twilight
                      </h5>
                      <span className="text-xs text-on-surface-variant mt-0.5">
                        Matte Screen 2% VLT • $280
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/*  Sub-Tier 03 Preview: Blackout  */}
              <div className="p-space-lg bg-surface-container-lowest rounded-2xl shadow-sm space-y-space-md">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                        Sub-Tier 03
                      </span>
                      <span className="text-outline text-xs">•</span>
                      <span className="font-label-sm text-label-sm text-on-surface uppercase">
                        0% Total VLT
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">
                      Blackout Roller Shades (14 Items)
                    </h4>
                  </div>
                  <button
                    className="text-body-sm font-label-md text-on-surface hover:text-secondary uppercase tracking-wider flex items-center gap-1"
                    type="button"
                  >
                    Expand Tier{" "}
                    <span className="material-symbols-outlined text-sm">
                      unfold_more
                    </span>
                  </button>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  100% light containment featuring quad-pass acrylic backing and
                  zero-gap aluminum side-channel tracks designed for master
                  suites, home cinemas, and executive suites.
                </p>
                {/*  Mini Preview Cards  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="flex gap-space-sm p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Nocturne Total Blockout roller shade with light-blocking side channels in luxury minimalist bedroom, pure blackout containment"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8XIplzNEIYgGEyu-HkFKywh_sB7Fpyt-wqEhfTRgHUkNvgxeMdLmPgb8XFQl8rWdKFVShg0VydrPd7X2KBaBQAWq52OrT7Rh97feTZ94ErvRYyEmnQIhWz3fLWbdLaQLIIId3lUUr7ODcCk_jv7TIzIXBmb0fmGDFYuu-4e4qQ9vVIjxniWbzDOtOc6d_8-ozpP9iGbwr1BYjeejD9YoFFpv29fp8ik-0_qrfBkyT1oOxl1YeTq9DfQ"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-label-sm text-outline">
                        SKU: RS-BO-0902
                      </span>
                      <h5 className="font-title-md text-body-sm text-on-surface font-semibold">
                        Nocturne Absolute
                      </h5>
                      <span className="text-xs text-on-surface-variant mt-0.5">
                        4-Pass Zero-Light • $320
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-space-sm p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Eclipse Architectural Dual-Roll system with blackout shade behind sheer daytime linen layer in luxury condominium"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3vJZUdzCxXRM1bgukI8_AqMoMwjjdhsoAfBNWDcEuCNdUXq7dr_FpXeMvU7Mqs1jPdAC5f7AjtD9jDP47SuVBRen9ak5FpFNDkBUCIISVXruYPHLm0necnUaZgXxyw8DhkfJRg1lZ6F3bUHYPCyPU7N8NxW65SLruwMSoEgDr6jkbgLHWVgYH1pDBWXjOPIy0geF2SXKhwYnn_zn0SfHvcxoDjAqrU6t5H1fEkZ0Z86OIxpaBjOB7LQ"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-label-sm text-outline">
                        SKU: RS-BO-0915
                      </span>
                      <h5 className="font-title-md text-body-sm text-on-surface font-semibold">
                        Eclipse Dual-Roll
                      </h5>
                      <span className="text-xs text-on-surface-variant mt-0.5">
                        Tandem Daylight/Blackout • $450
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*  "+ Create Product" Architectural Slide-Out Modal Drawer  */}
          <div
            className="fixed inset-0 z-50 pointer-events-none transition-all duration-300 opacity-0"
            id="create-product-drawer"
          >
            {/*  Backdrop Scrim  */}
            <div
              className="absolute inset-0 bg-primary-container/40 backdrop-blur-sm transition-opacity opacity-0"
              id="drawer-backdrop"
            ></div>
            {/*  Right Drawer Content  */}
            <div
              className="absolute top-0 right-0 h-full w-full max-w-xl bg-surface-container-lowest shadow-2xl p-space-md lg:p-space-lg flex flex-col justify-between transform translate-x-full transition-transform duration-300 ease-out pointer-events-auto overflow-y-auto"
              id="drawer-panel"
            >
              <div className="space-y-space-md">
                {/*  Drawer Header  */}
                <div className="flex items-center justify-between pb-space-sm">
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                      Architectural Registry
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      Add New Product Formulation
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Step-by-step hierarchical classification engine.
                    </p>
                  </div>
                  <button
                    className="p-2 text-outline hover:text-on-surface rounded-full hover:bg-surface-container-low"
                    id="close-drawer-btn"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      close
                    </span>
                  </button>
                </div>
                {/*  Hierarchy Step 1: Master Category  */}
                <div className="space-y-2">
                  <label className="block font-label-md text-label-md text-on-surface uppercase tracking-wider">
                    Step 1 • Master Shade Category{" "}
                    <span className="text-secondary">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full px-space-md py-space-sm bg-surface rounded-lg text-on-surface font-body-sm appearance-none focus:outline-none focus:ring-1 focus:ring-secondary/50 shadow-xs">
                      <option selected="" value="roller-shades">
                        Roller Shades (Active Selection)
                      </option>
                      <option value="duo-stripes">
                        Duo Stripes (Zebra Blinds)
                      </option>
                      <option value="honeycomb">Honeycomb Blinds</option>
                      <option value="roman-shades">Roman Shades</option>
                      <option value="vertical-drapery">
                        Vertical Drapery Shades
                      </option>
                      <option value="shangrila">Shangrila Shades</option>
                      <option value="butterfly">Butterfly Roller Shades</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3.5 text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>
                  <p className="text-[11px] font-label-sm text-outline">
                    Defines mechanical mounting hardware and fascia envelope.
                  </p>
                </div>
                {/*  Hierarchy Step 2: Opacity Sub-Tier (The explicit mandate)  */}
                <div className="space-y-2">
                  <label className="block font-label-md text-label-md text-on-surface uppercase tracking-wider">
                    Step 2 • Opacity Sub-Tier{" "}
                    <span className="text-secondary">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <label className="flex flex-col p-space-sm rounded-lg bg-surface hover:bg-surface-container-low cursor-pointer transition-all has-[:checked]:bg-primary-container has-[:checked]:text-on-primary">
                      <input
                        checked=""
                        className="sr-only"
                        name="product_opacity"
                        type="radio"
                        value="translucent"
                      />
                      <span className="font-title-md text-body-sm font-semibold">
                        Translucent
                      </span>
                      <span className="text-[11px] opacity-75 mt-0.5">
                        15-25% VLT • Sheer
                      </span>
                    </label>
                    <label className="flex flex-col p-space-sm rounded-lg bg-surface hover:bg-surface-container-low cursor-pointer transition-all has-[:checked]:bg-primary-container has-[:checked]:text-on-primary">
                      <input
                        className="sr-only"
                        name="product_opacity"
                        type="radio"
                        value="room-darkening"
                      />
                      <span className="font-title-md text-body-sm font-semibold">
                        Room Darkening
                      </span>
                      <span className="text-[11px] opacity-75 mt-0.5">
                        2-5% VLT • Private
                      </span>
                    </label>
                    <label className="flex flex-col p-space-sm rounded-lg bg-surface hover:bg-surface-container-low cursor-pointer transition-all has-[:checked]:bg-primary-container has-[:checked]:text-on-primary">
                      <input
                        className="sr-only"
                        name="product_opacity"
                        type="radio"
                        value="blackout"
                      />
                      <span className="font-title-md text-body-sm font-semibold">
                        Blackout
                      </span>
                      <span className="text-[11px] opacity-75 mt-0.5">
                        0% VLT • Absolute
                      </span>
                    </label>
                  </div>
                </div>
                {/*  Hierarchy Step 3: Specific Product Identifiers  */}
                <div className="space-y-space-sm pt-space-xs">
                  <div className="space-y-1">
                    <label className="block font-label-md text-label-md text-on-surface uppercase tracking-wider">
                      Step 3 • Shade Model Name &amp; Series
                    </label>
                    <input
                      className="w-full px-space-md py-space-sm bg-surface rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-1 focus:ring-secondary/50 shadow-xs"
                      placeholder="e.g. Solstice Architectural Linen"
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-space-sm">
                    <div className="space-y-1">
                      <label className="block font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        Fabric SKU Code
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm bg-surface rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-1 focus:ring-secondary/50 shadow-xs"
                        placeholder="RS-TR-0512"
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        Motorization
                      </label>
                      <select className="w-full px-space-md py-space-sm bg-surface rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-1 focus:ring-secondary/50 shadow-xs">
                        <option>Matter DC Motor (Integrated Battery)</option>
                        <option>24V Hardwired Brushless DC</option>
                        <option>Manual Zero-Gravity Spring</option>
                        <option>Dual Motor Synchronized</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-space-sm">
                    <div className="space-y-1">
                      <label className="block font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        Base Price ($)
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm bg-surface rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-1 focus:ring-secondary/50 shadow-xs"
                        placeholder="280"
                        type="number"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        Max Width
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm bg-surface rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-1 focus:ring-secondary/50 shadow-xs"
                        placeholder="144 in (365cm)"
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        Max Drop
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm bg-surface rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-1 focus:ring-secondary/50 shadow-xs"
                        placeholder="180 in (457cm)"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                {/*  Spec Verification Ribbon  */}
                <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-lg mt-0.5">
                    verified
                  </span>
                  <div className="text-[12px] text-on-surface-variant font-body-sm leading-snug">
                    Assigning to path:{" "}
                    <strong className="text-on-surface">
                      Categories &gt; Roller Shades &gt; Translucent
                    </strong>
                    . This SKU will inherit architectural drop-cut formulas and
                    smart-home mesh profiles.
                  </div>
                </div>
              </div>
              {/*  Drawer Footer Actions  */}
              <div className="pt-space-md mt-space-md flex items-center justify-end gap-space-sm">
                <button
                  className="px-space-md py-space-sm font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors"
                  id="cancel-drawer-btn"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="px-space-lg py-space-sm bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg shadow-md hover:bg-surface-tint transition-all"
                  type="button"
                >
                  Save &amp; Publish to Catalog
                </button>
              </div>
            </div>
          </div>
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
    </main>
  );
}
