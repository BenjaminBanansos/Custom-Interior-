export default function Page() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}`,
        }}
      />
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full px-gutter-mobile lg:px-margin flex items-center justify-between gap-gutter border-b border-surface-container-high bg-surface-container-lowest">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-title-md tracking-tight font-semibold text-on-surface">
                SMART DECOR
              </span>
              <span className="text-outline text-xs">//</span>
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-[10px] uppercase tracking-wider font-semibold">
                ADMIN CONSOLE
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-2 pl-space-xs text-[11px] font-label-sm">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-low text-secondary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Live Production v4.2
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant">
                <span className="material-symbols-outlined text-[13px] text-secondary">
                  cloud_done
                </span>
                ERP Sync: Active
              </span>
            </div>
            <nav className="hidden xl:flex items-center gap-space-md pl-space-md">
              <a
                className="font-label-md text-label-md text-on-surface border-b-2 border-primary pb-1 font-semibold uppercase tracking-wider"
                href="#"
              >
                Catalog &amp; Hierarchy
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface pb-1 uppercase tracking-wider transition-colors"
                href="#"
              >
                Inventory &amp; Stock
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface pb-1 uppercase tracking-wider transition-colors"
                href="#"
              >
                Orders &amp; Fulfillment
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface pb-1 uppercase tracking-wider transition-colors"
                href="#"
              >
                Pricing &amp; B2B Rules
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface pb-1 uppercase tracking-wider transition-colors"
                href="#"
              >
                Partners
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface pb-1 uppercase tracking-wider transition-colors"
                href="#"
              >
                Settings &amp; Logs
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="hidden md:flex items-center bg-surface-container-low px-space-sm py-1 rounded gap-space-xs">
              <span className="material-symbols-outlined text-outline text-base">
                search
              </span>
              <input
                className="bg-transparent font-body-sm text-xs text-on-surface placeholder:text-outline focus:outline-none w-48 lg:w-64"
                placeholder="Search SKU, barcode, category..."
                type="text"
              />
              <span className="text-[10px] font-label-sm text-outline border border-surface-container-high px-1 rounded">
                ⌘K
              </span>
            </div>
            <div className="flex items-center gap-2 pl-space-xs border-l border-surface-container-high">
              <button
                className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors relative"
                title="Notifications"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">
                  notifications
                </span>
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-secondary"></span>
              </button>
              <button
                className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
                title="Audit Logs"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">
                  history
                </span>
              </button>
              <div className="flex items-center gap-2 pl-1">
                <div className="flex flex-col text-right hidden sm:flex">
                  <span className="text-xs font-semibold text-on-surface leading-tight">
                    Operations Manager
                  </span>
                  <span className="text-[10px] text-outline font-label-sm uppercase">
                    Store Admin · SD-984
                  </span>
                </div>
                <img
                  alt="Admin Avatar"
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-surface-container-high"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1WZi7f9YBpfgzn0EU8P8PLEKc8QlQRd7_L2pyYr64TTGzMBZwp8GoWlWNcO3SoyM-UCUf6VqgC7t3u28Qv2IEptmoEPks1-b1lUmla3us8hwGljN-0sW-P0LZhLz0beLk83Q0L5ifyj2z7lTU6Qc7VdmIXyVhXhMrDv94ui0U_vI1xDHaOpcaqDW45nwGInwW_Z4mNR-ipQTekyzZOL11KpCmWpZ1FbYAC0Sbe4Hmxp-ZT5-oIBUMt1gzpaoif-WuFdc-VaJeqic0A"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full bg-surface pt-16">
        <div className="w-full px-gutter-mobile lg:px-margin pt-space-md pb-space-sm">
          <nav
            aria-label="Global Breadcrumb"
            className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase"
          >
            <a
              className="hover:text-on-surface transition-colors flex items-center gap-1"
              href="#"
            >
              <span className="material-symbols-outlined text-sm">
                dashboard
              </span>
              Admin Console
            </a>
            <span className="text-outline text-xs">/</span>
            <a className="hover:text-on-surface transition-colors" href="#">
              Catalog Management
            </a>
            <span className="text-outline text-xs">/</span>
            <span className="text-on-surface font-semibold">
              Hierarchy &amp; Opacity Taxonomy
            </span>
          </nav>
        </div>
        <div className="flex flex-col w-full">
          {/* Top Command & Architecture Overview Bar */}
          <section className="w-full px-gutter-mobile lg:px-margin pt-space-xs pb-space-lg">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-1 max-w-3xl">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-[10px] uppercase tracking-wider font-semibold">
                    Admin Control Panel
                  </span>
                  <span className="text-outline text-xs">•</span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium uppercase tracking-wider">
                    Catalog Topology v4.2 Production
                  </span>
                  <span className="text-outline text-xs">•</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Strict 3-Tier Rule Enforced
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Product Hierarchy &amp; Catalog Manager
                </h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Admin Console · Enforcing strict 3-tier hierarchy:{" "}
                  <span className="text-on-surface font-semibold">
                    Master Category
                  </span>{" "}
                  (Hardware/Fascia) →{" "}
                  <span className="text-on-surface font-semibold">
                    Opacity Classification
                  </span>{" "}
                  (Translucent, Room Darkening, Blackout) →{" "}
                  <span className="text-on-surface font-semibold">
                    Product SKU &amp; Technical Specs
                  </span>
                  .
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                <button
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container-lowest text-on-surface shadow-xs rounded-lg hover:bg-surface-container-low transition-all text-xs font-label-md uppercase tracking-wider border border-surface-container-high"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm text-outline">
                    sync
                  </span>
                  <span>Batch Re-index</span>
                </button>
                <button
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container-lowest text-on-surface shadow-xs rounded-lg hover:bg-surface-container-low transition-all text-xs font-label-md uppercase tracking-wider border border-surface-container-high"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm text-outline">
                    download
                  </span>
                  <span>Export CSV</span>
                </button>
                <button
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container-lowest text-on-surface shadow-xs rounded-lg hover:bg-surface-container-low transition-all text-xs font-label-md uppercase tracking-wider border border-surface-container-high"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm text-outline">
                    rule
                  </span>
                  <span>Audit Rules</span>
                </button>
                <button
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container-lowest text-on-surface shadow-xs rounded-lg hover:bg-surface-container-low transition-all text-xs font-label-md uppercase tracking-wider border border-surface-container-high"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm text-outline">
                    create_new_folder
                  </span>
                  <span>+ Add Category</span>
                </button>
                <button
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-primary-container text-on-primary rounded-lg shadow-sm hover:bg-surface-tint transition-all font-label-md text-xs uppercase tracking-wider"
                  id="open-create-drawer-btn"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">
                    add_circle
                  </span>
                  <span>+ Create Product</span>
                </button>
              </div>
            </div>
          </section>
          {/* Level 1: Category Strip / Architectural Ribbon */}
          <section className="w-full px-gutter-mobile lg:px-margin pb-space-lg">
            <div className="flex items-center justify-between pb-space-xs mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-[10px] uppercase font-bold tracking-widest">
                  Tier 1 Hierarchy
                </span>
                <span className="text-outline text-xs">/</span>
                <span className="font-title-md text-title-md text-on-surface">
                  Master Architectural Categories (7 Categories Active)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-label-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  Active Filter: <strong>Roller Shades (58 SKUs)</strong>
                </span>
                <span className="text-outline">|</span>
                <button
                  className="text-secondary hover:underline flex items-center gap-0.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">
                    reorder
                  </span>
                  Reorder Tiers
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-space-sm">
              <div className="group relative flex flex-col justify-between p-2.5 rounded-xl bg-surface-container-lowest shadow-sm ring-2 ring-primary cursor-pointer transition-all">
                <div className="relative w-full h-20 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Roller Shades Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzwgf2D9iwHrCvWbmyoEy_yL8XE9hoX0JgCzK4YTFU2tvJKwJbTwT-XyW3zSsqqWbhYVZXMrbEBJ2WsnclXseNS4NC2-BdbAjm129d_DE-NUDiLbuzTJ48OmB83XfGDz6esoYMhM19dGhIv1U1EMUYzlEdEJP6m3hgwZy_d2W-9izETrxqj9cID2i8NU0axUbUkYiUDVw5GqxfGHdDU6-DDV2W1rrAocGLAadxPW2F7nUYy5NsIcaytA"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-[9px] uppercase font-bold">
                    Selected
                  </div>
                  <div className="absolute top-1 right-1 w-5 h-5 rounded bg-surface-container-lowest/90 flex items-center justify-center text-outline hover:text-on-surface">
                    <span className="material-symbols-outlined text-xs">
                      settings
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-xs font-bold text-on-surface">
                      Roller Shades
                    </h3>
                    <span className="text-[10px] font-semibold text-secondary">
                      58 SKUs
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-outline font-label-sm">
                    <span>3 Opacity Sub-tiers</span>
                    <span className="text-secondary font-medium">● Live</span>
                  </div>
                </div>
              </div>
              <div className="group relative flex flex-col justify-between p-2.5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container-high">
                <div className="relative w-full h-20 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Duo Stripes Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZlvyUHK88ul6HLL_uuJFkUdNsG1ya-Ze_W-CHgkOQRqB8zO_pFFBWhApBcANOTH0HgbXLxeX4WKbO8UZbjXf5a6t1bM5Gf9jBGJDhK5GBFAUZOwRw4F9OuFxBPY5EGbiB8slm26f2r79zMMX_DwrPmbvijXgEwOyer7U54p31qGRl3xSoxOEG5ZdT_rG059l6wPfOzcfqhznOjmBSOC60VW5-Eo3h7gbSCr1oSKfAQS3_NjlARKkUEA"
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 rounded bg-surface-container-lowest/90 flex items-center justify-center text-outline hover:text-on-surface">
                    <span className="material-symbols-outlined text-xs">
                      settings
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-xs font-bold text-on-surface">
                      Duo Stripes
                    </h3>
                    <span className="text-[10px] font-semibold text-on-surface-variant">
                      46 SKUs
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-outline font-label-sm">
                    <span>Zebra / Dual</span>
                    <span className="text-secondary font-medium">● Live</span>
                  </div>
                </div>
              </div>
              <div className="group relative flex flex-col justify-between p-2.5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container-high">
                <div className="relative w-full h-20 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Honeycomb Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvceULeY5Ov0pxM9F6bU4-xzlw0KBH25UtUSznUUmN6YyCxM6Ec4XjveDfUW6c_UKV9DlV3xFVkHpUmNnnsQ2ZeP22AaXIU6vIt_6Aw-dY8oCk7wMVOFjRYRImuVQ-VaVjMnPKrl73yrtYFUFiiTviny1xEZsmKvc9QdMxQRm-NiCSPyE83KOdRKTJzCl4v3cVW-hUgSgbhx109Nsm67felN0pjmYy5H1-B_xDdlefHBkbjWqOcbtFlg"
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 rounded bg-surface-container-lowest/90 flex items-center justify-center text-outline hover:text-on-surface">
                    <span className="material-symbols-outlined text-xs">
                      settings
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-xs font-bold text-on-surface">
                      Honeycomb
                    </h3>
                    <span className="text-[10px] font-semibold text-on-surface-variant">
                      32 SKUs
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-outline font-label-sm">
                    <span>Cellular</span>
                    <span className="text-secondary font-medium">● Live</span>
                  </div>
                </div>
              </div>
              <div className="group relative flex flex-col justify-between p-2.5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container-high">
                <div className="relative w-full h-20 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Roman Shades Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_Yc4YSCLE_Oont0EpvX5U6tJESB-tBCq3fFwKHuYXvuGgKRmmuOQ7Mgm8c8hE0UUKUJyBsC5fBvLhWUODMtwpr1BDXW0hOQ9sE6BR3appBhY_2Y9zHeavXGJLM3WBL9DuIE4WJJOB0eLGOOqnq4qaK8i7GR2Plwmm8Z4BskapYHooLwNICZtR0ik_Ex2MkSLAD8z8X2XSI8mXAz80JHXXrmEQtHU5xnQgGa__lnbSZT-dfRrId95Mxg"
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 rounded bg-surface-container-lowest/90 flex items-center justify-center text-outline hover:text-on-surface">
                    <span className="material-symbols-outlined text-xs">
                      settings
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-xs font-bold text-on-surface">
                      Roman Shades
                    </h3>
                    <span className="text-[10px] font-semibold text-on-surface-variant">
                      18 SKUs
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-outline font-label-sm">
                    <span>Flat &amp; Fold</span>
                    <span className="text-secondary font-medium">● Live</span>
                  </div>
                </div>
              </div>
              <div className="group relative flex flex-col justify-between p-2.5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container-high">
                <div className="relative w-full h-20 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Vertical Drapery Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0ODWtdJjXjH8-uwgX6yQP6NGQplVTuKWIoVKq6INrMPuijZnKMK56PG2drREQwOf2x-oCgCyEGtVtoabCui7JZtiTE9Y8K53-E9LhlL7iKX3-1__69TFIXnIfZcta1c5Lhc1tFg2cGp-Yz-5Eq-bm1l6EHO8ONS5ysnbMe8TRN-96FNT0hEc6axM8e1IKHSI7hpHCTk3NSejmhF9BzYM3-8jjUHNSVnbav4TEpPSzUrmsGqiO7MbavQ"
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 rounded bg-surface-container-lowest/90 flex items-center justify-center text-outline hover:text-on-surface">
                    <span className="material-symbols-outlined text-xs">
                      settings
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-xs font-bold text-on-surface">
                      Vertical Drapery
                    </h3>
                    <span className="text-[10px] font-semibold text-on-surface-variant">
                      14 SKUs
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-outline font-label-sm">
                    <span>Smart Vane</span>
                    <span className="text-secondary font-medium">● Live</span>
                  </div>
                </div>
              </div>
              <div className="group relative flex flex-col justify-between p-2.5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container-high">
                <div className="relative w-full h-20 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Shangrila Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeY0-wbvnLIALwdFjlqC9jI_ehMb5JsOnn468_0pSgoz7-oCK8hiI1EJbo8ij7dv_54t0SfldEy0KKFnPokDMykxa1CpYw83Umkzpr13-wLGISpD3EKrTiXp-uPuW5oFKZh81IzJY-u-V_V-JaDC6IZ5wDSPfiFacOOlTs4N7_jQVUjVz4pCWJFLSnv_qcI5uDlHOM8jmy0CyegkrgvGjItz-onqCt1MzzqE6NF9ZG8_HXNl0NBurwhg"
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 rounded bg-surface-container-lowest/90 flex items-center justify-center text-outline hover:text-on-surface">
                    <span className="material-symbols-outlined text-xs">
                      settings
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-xs font-bold text-on-surface">
                      Shangrila
                    </h3>
                    <span className="text-[10px] font-semibold text-on-surface-variant">
                      12 SKUs
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-outline font-label-sm">
                    <span>Triple Sheer</span>
                    <span className="text-secondary font-medium">● Live</span>
                  </div>
                </div>
              </div>
              <div className="group relative flex flex-col justify-between p-2.5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md cursor-pointer transition-all border border-surface-container-high">
                <div className="relative w-full h-20 rounded-lg overflow-hidden mb-space-xs bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Butterfly Roller Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_R9ZM0f2fFxoPRM247jYxkcMz83xWr2jGSIxvkOQ8dAQ3mGx0AllkWun1ksyL35xQu1ERE6A8a8yO_frW3H-HD25Pqz8l4l02GqDgTDHWTcfJE0uACQM_ODDA-8FYTecf2bD7dIqI-2CApbmIC59lKz_QLAAFvCsgGbqW0PJ9UwotW9olI3u43PKjtCK_uSELtwqJiFOp-mslx7GrqdNvoQW0eVg-89YsZFNilohQUxEXjnrNNheHMQ"
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 rounded bg-surface-container-lowest/90 flex items-center justify-center text-outline hover:text-on-surface">
                    <span className="material-symbols-outlined text-xs">
                      settings
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-xs font-bold text-on-surface">
                      Butterfly Roller
                    </h3>
                    <span className="text-[10px] font-semibold text-on-surface-variant">
                      9 SKUs
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-outline font-label-sm">
                    <span>Dual Screen</span>
                    <span className="text-secondary font-medium">● Live</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Level 2: Active Category Focus + Opacity Tiers Architecture */}
          <section className="w-full px-gutter-mobile lg:px-margin pb-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high space-y-space-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-space-sm border-b border-surface-container-high gap-space-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">
                    <span>Tier 2 Taxonomy Control</span>
                    <span>•</span>
                    <span className="text-on-surface font-semibold">
                      Roller Shades Hardware Scope
                    </span>
                  </div>
                  <h2 className="font-headline-sm text-title-md text-on-surface tracking-tight font-bold">
                    Opacity Classification &amp; Light Transmittance Rules
                  </h2>
                  <p className="font-body-sm text-xs text-on-surface-variant max-w-2xl">
                    Enforcing mandatory sub-tier assignment for every SKU.
                    Fabric options and hembar assemblies inherit pricing
                    formulas based on optical density tiers.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-low text-xs font-label-md uppercase tracking-wider hover:bg-surface-container text-on-surface transition-all border border-surface-container-high">
                    <span className="material-symbols-outlined text-sm text-outline">
                      tune
                    </span>
                    Pricing Multipliers
                  </button>
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-low text-xs font-label-md uppercase tracking-wider hover:bg-surface-container text-on-surface transition-all border border-surface-container-high">
                    <span className="material-symbols-outlined text-sm text-outline">
                      add
                    </span>
                    Add Opacity Grade
                  </button>
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-low text-xs font-label-md uppercase tracking-wider hover:bg-surface-container text-on-surface transition-all border border-surface-container-high">
                    <span className="material-symbols-outlined text-sm text-outline">
                      swap_horiz
                    </span>
                    Reassign Tier
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm pt-space-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    className="px-3 py-1.5 rounded-lg font-label-md text-xs uppercase tracking-wider bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-all border border-surface-container-high"
                    type="button"
                  >
                    All Roller SKUs (58)
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg font-label-md text-xs uppercase tracking-wider bg-primary-container text-on-primary shadow-xs transition-all flex items-center gap-1.5 font-semibold"
                    type="button"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Translucent (23 Active SKUs · 15-25% VLT)
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg font-label-md text-xs uppercase tracking-wider bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-all border border-surface-container-high flex items-center gap-1.5"
                    type="button"
                  >
                    Room Darkening (21 Active SKUs · 2-5% VLT)
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg font-label-md text-xs uppercase tracking-wider bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-all border border-surface-container-high flex items-center gap-1.5"
                    type="button"
                  >
                    Blackout (14 Active SKUs · 0% VLT)
                  </button>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-xs bg-surface-container-low px-2.5 py-1 rounded-md border border-surface-container-high">
                  <span className="material-symbols-outlined text-sm text-secondary">
                    info
                  </span>
                  <span>
                    Active Filter: <strong>Translucent Sub-tier</strong>{" "}
                    (Openness: 1% to 5%)
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* Level 3: Products Categorized Strictly under Category -> Opacity (Translucent Focus) */}
          <section className="w-full px-gutter-mobile lg:px-margin pb-space-xl">
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high overflow-hidden mb-space-lg">
              <div className="p-space-md border-b border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-space-sm bg-surface-container-low/40">
                <div className="flex items-center gap-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-xs uppercase font-bold text-secondary tracking-wider">
                      SKU Inventory Registry
                    </span>
                    <span className="text-outline text-xs">/</span>
                    <h3 className="font-title-md text-sm font-bold text-on-surface">
                      Translucent Tier SKUs (Showing 4 of 23)
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-label-sm text-on-surface-variant font-semibold">
                    Hierarchy: Roller Shades &gt; Translucent
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-container-lowest text-on-surface text-xs font-label-md uppercase tracking-wider rounded border border-surface-container-high hover:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-sm">
                      check_box
                    </span>
                    Bulk Actions
                  </button>
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-container-lowest text-on-surface text-xs font-label-md uppercase tracking-wider rounded border border-surface-container-high hover:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-sm">
                      swap_vert
                    </span>
                    Sort: SKU Asc
                  </button>
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-container-lowest text-on-surface text-xs font-label-md uppercase tracking-wider rounded border border-surface-container-high hover:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-sm">
                      filter_alt
                    </span>
                    Filter Active
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low text-[11px] font-label-md uppercase tracking-wider text-outline border-b border-surface-container-high">
                    <tr>
                      <th className="p-3 w-8 text-center">
                        <input
                          className="rounded border-outline cursor-pointer"
                          type="checkbox"
                        />
                      </th>
                      <th className="p-3">SKU &amp; Barcode</th>
                      <th className="p-3">Product Name &amp; Spec</th>
                      <th className="p-3">Hierarchy Path</th>
                      <th className="p-3">VLT / Optical</th>
                      <th className="p-3">Pricing &amp; Margin</th>
                      <th className="p-3">Stock &amp; Lead Time</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high text-xs font-body-sm">
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-3 text-center">
                        <input
                          className="rounded border-outline cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-mono font-semibold text-on-surface text-xs">
                          RS-TR-0104
                        </div>
                        <div className="text-[10px] text-outline font-mono">
                          UPC: 84920194821
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            alt="Aura Linen"
                            className="w-12 h-12 rounded object-cover flex-shrink-0 border border-surface-container-high"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-lPEATFkEZhhSJ9BCagnmlC5ir36hkWJYqFzBx2CiCBnxm2q4EOnbM3zA-uuE2HBJlenjYizJ6AruwCOuJlfha-micZ-ibLN7D5Dh6xZSc8GvsyEz-m3UGlH5-hc6FBNGPdd9UmzThCSZUDJPGHqVJI8GK5UoWEqt8Dq_sweB_Zn3iC_9ZVWhiwK8YqlLNpXDfnImeVQvtZN26SAPGEdT8K5eflB-fVuNgjjL2punt-g5zRdLDShLWw"
                          />
                          <div>
                            <div className="font-semibold text-on-surface text-xs">
                              Aura Linen Roller Shade
                            </div>
                            <div className="text-[11px] text-on-surface-variant">
                              Belgian Flax · Matter/Zigbee · 4 Colorways
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container-low text-[10px] font-mono text-on-surface">
                          Roller &gt; Translucent
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-secondary text-xs">
                          18% VLT
                        </span>
                        <div className="text-[10px] text-outline">
                          3% Openness
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-on-surface">
                          $240.00
                        </div>
                        <div className="text-[10px] text-secondary font-medium">
                          Cost: $98 (59% Margin)
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-xs font-medium text-on-surface">
                          142 yds in stock
                        </div>
                        <div className="text-[10px] text-outline">
                          Fabrication: 3-5 days
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-secondary font-medium text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Published
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            className="px-2 py-1 rounded text-xs font-label-md uppercase bg-surface-container-low hover:bg-surface-container text-on-surface"
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="p-1 rounded text-outline hover:text-on-surface"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-base">
                              more_vert
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-3 text-center">
                        <input
                          className="rounded border-outline cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-mono font-semibold text-on-surface text-xs">
                          RS-TR-0109
                        </div>
                        <div className="text-[10px] text-outline font-mono">
                          UPC: 84920194829
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            alt="Nordic Sheer"
                            className="w-12 h-12 rounded object-cover flex-shrink-0 border border-surface-container-high"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM-0rDQf28xysO9j8uron8VZnCUtcsVipe0cdqY4U-IpGT4TK7XG1xfttKd-8YP-KEF1xrdQGG4T0i4J68Ln0lDamapxQMzRdr8qNBZPpGbE27eOZDypJJEH4SMWLA9pXM4Q-ulBnsyoayxZpE314vGijz5f-q3lBXDEEzm6tTa3y5gtSvKAVKb_NlA-CeWnQtPJUIOiXDjgR9ounucQURjv2xcegMPp7u2sk0Vzw5It1Uiu_sLO3mnQ"
                          />
                          <div>
                            <div className="font-semibold text-on-surface text-xs">
                              Nordic Sheer Solar Shade
                            </div>
                            <div className="text-[11px] text-on-surface-variant">
                              Micro-weave · Recessed Pocket · 3 Weaves
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container-low text-[10px] font-mono text-on-surface">
                          Roller &gt; Translucent
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-secondary text-xs">
                          22% VLT
                        </span>
                        <div className="text-[10px] text-outline">
                          5% Solar Open
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-on-surface">
                          $210.00
                        </div>
                        <div className="text-[10px] text-secondary font-medium">
                          Cost: $84 (60% Margin)
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-xs font-medium text-on-surface">
                          310 yds in stock
                        </div>
                        <div className="text-[10px] text-outline">
                          Fabrication: 2-4 days
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-secondary font-medium text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Published
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            className="px-2 py-1 rounded text-xs font-label-md uppercase bg-surface-container-low hover:bg-surface-container text-on-surface"
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="p-1 rounded text-outline hover:text-on-surface"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-base">
                              more_vert
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-3 text-center">
                        <input
                          className="rounded border-outline cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-mono font-semibold text-on-surface text-xs">
                          RS-TR-0218
                        </div>
                        <div className="text-[10px] text-outline font-mono">
                          UPC: 84920194833
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            alt="Kyoto Paper-Linen"
                            className="w-12 h-12 rounded object-cover flex-shrink-0 border border-surface-container-high"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiEhKhJVzq2JWRFSvs250od-2vRQO58JMltJcIEDhtRgyElRspS39_TI_rq2IZnzbN6v2QosbQ1691MgmXJKsnIj_f4GYo6vJfVB9_8upCqgVdoqHxYzyok03JYkCISYE4DhitPIx2VhmEfH3MFsE12mA7QJyTfe-X4bSMaangnnC3epxK5VDG2FR25zeqGDgBQYobLG5nFeBnUjG7VTn_JMVdp31atCovtsvOb06v8XcODQekqJYXGg"
                          />
                          <div>
                            <div className="font-semibold text-on-surface text-xs">
                              Kyoto Paper-Linen Shade
                            </div>
                            <div className="text-[11px] text-on-surface-variant">
                              Washi Braided · Concealed Hem · 4 Tones
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container-low text-[10px] font-mono text-on-surface">
                          Roller &gt; Translucent
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-secondary text-xs">
                          14% VLT
                        </span>
                        <div className="text-[10px] text-outline">
                          Ambient Dispersion
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-on-surface">
                          $295.00
                        </div>
                        <div className="text-[10px] text-secondary font-medium">
                          Cost: $115 (61% Margin)
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-xs font-medium text-on-surface">
                          85 yds in stock
                        </div>
                        <div className="text-[10px] text-outline">
                          Fabrication: 5-7 days
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-secondary font-medium text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Published
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            className="px-2 py-1 rounded text-xs font-label-md uppercase bg-surface-container-low hover:bg-surface-container text-on-surface"
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="p-1 rounded text-outline hover:text-on-surface"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-base">
                              more_vert
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-3 text-center">
                        <input
                          className="rounded border-outline cursor-pointer"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-mono font-semibold text-on-surface text-xs">
                          RS-TR-0310
                        </div>
                        <div className="text-[10px] text-outline font-mono">
                          UPC: 84920194840
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            alt="Calais Silk-Loom"
                            className="w-12 h-12 rounded object-cover flex-shrink-0 border border-surface-container-high"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3v_-nzTK7CcYTaVj2uUfebEZPEmGAVAcgxSGR3ol0ouy7KyZh6bAYXzwJDzIfnFn56udAeFMvaf9RUZsDTb_pOEQOmDDC17ivNKxmP0JjrkP34ZUk7gZLmMFWvcn9AfgoTHqISIcAFnsGYabfZ0I5RrQ5g9tCnp5f1Y_-y09nZlSq2EIKxFfCg0Ab4DRyJjQr7xEa66fxinXev4tqPAtPL_kZUUz46MSfmbVsjvZ63FAPYf5KRMDCCw"
                          />
                          <div>
                            <div className="font-semibold text-on-surface text-xs">
                              Calais Silk-Loom Shade
                            </div>
                            <div className="text-[11px] text-on-surface-variant">
                              Satin Filament · Brushless 24V · French Milled
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container-low text-[10px] font-mono text-on-surface">
                          Roller &gt; Translucent
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-secondary text-xs">
                          20% VLT
                        </span>
                        <div className="text-[10px] text-outline">
                          Soft Glare Diffuse
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-on-surface">
                          $270.00
                        </div>
                        <div className="text-[10px] text-secondary font-medium">
                          Cost: $105 (61% Margin)
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-xs font-medium text-on-surface">
                          60 yds (Low Stock)
                        </div>
                        <div className="text-[10px] text-outline">
                          Fabrication: 4-6 days
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-secondary font-medium text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Published
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            className="px-2 py-1 rounded text-xs font-label-md uppercase bg-surface-container-low hover:bg-surface-container text-on-surface"
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="p-1 rounded text-outline hover:text-on-surface"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-base">
                              more_vert
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-surface-container-low/30 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant gap-2 font-label-sm">
                <span>
                  Showing <strong>1 to 4</strong> of 23 Translucent SKUs in
                  Roller Shades
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-container-high hover:bg-surface-container text-on-surface disabled:opacity-50"
                    disabled=""
                    type="button"
                  >
                    Previous
                  </button>
                  <button
                    className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-bold"
                    type="button"
                  >
                    1
                  </button>
                  <button
                    className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-container-high hover:bg-surface-container text-on-surface"
                    type="button"
                  >
                    2
                  </button>
                  <button
                    className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-container-high hover:bg-surface-container text-on-surface"
                    type="button"
                  >
                    3
                  </button>
                  <button
                    className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-container-high hover:bg-surface-container text-on-surface"
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
              <div className="p-space-md bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-xs text-secondary uppercase font-bold tracking-wider">
                        Sub-Tier 02 Control
                      </span>
                      <span className="text-outline text-xs">•</span>
                      <span className="font-label-sm text-xs text-on-surface uppercase">
                        2-5% VLT
                      </span>
                    </div>
                    <h4 className="font-title-md text-sm font-bold text-on-surface">
                      Room Darkening Roller Shades (21 Active SKUs)
                    </h4>
                  </div>
                  <button
                    className="text-xs font-label-md text-on-surface hover:text-secondary uppercase tracking-wider flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-low border border-surface-container-high"
                    type="button"
                  >
                    Manage Sub-Tier{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Configured for dual-layer blackout channels and dim-out
                  weaving matrix. Base lead time: 4-6 business days.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="flex gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high cursor-pointer hover:bg-surface-container transition-colors">
                    <div className="w-12 h-12 rounded bg-surface-container-high overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Meridian Weave"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9XxDug4YNcebqWTPTUYGd04-bLC5E-hhogafwWoEcEGcyS_k-bcq9Sp9TMCl0emOAsnH2J4doJOTOSdg4WLvyc131bGuxiIsnd-kmlT__MMEdiOkKbweZWFUFOoMRevtm5KhRQlhRcQBqWY10dfO39UoNCMtuBe4HT_f3nMAI-GCyEAO_mEd-cCYYCVp0QI6XQZSABmOY6ApD-mcThpytyslb5XgDSWmmsvAo9A0JQUpSdYgyh72SjQ"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-mono text-outline">
                        RS-RD-0442
                      </span>
                      <h5 className="text-xs font-semibold text-on-surface">
                        Meridian Weave
                      </h5>
                      <span className="text-[11px] text-secondary font-medium">
                        $265 · 3% VLT
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high cursor-pointer hover:bg-surface-container transition-colors">
                    <div className="w-12 h-12 rounded bg-surface-container-high overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Vesper Twilight"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfhw8KjbkqcogHFdlnq95mO46-NtVZsr0UuJbNxQE0cqqy-wIfFg3JVMLbuBCEAEMGFigqEADC3NkLd44M101waFxpZfxv7hI9JEP6kZwWvbKHqqBcPytnqC-NpWwtXgbHyn5C_zPePZCeE5Z_86A_uUPJAfDtnHwUkdRG2A2l7dF810lFD6Ur0RspcxL_cHmJe_8F-PSPBzy22FMC-dH41dbpPEGCajUMEh7q1U2FhRfa8jsLHAcQSQ"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-mono text-outline">
                        RS-RD-0488
                      </span>
                      <h5 className="text-xs font-semibold text-on-surface">
                        Vesper Twilight
                      </h5>
                      <span className="text-[11px] text-secondary font-medium">
                        $280 · 2% VLT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-space-md bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-xs text-secondary uppercase font-bold tracking-wider">
                        Sub-Tier 03 Control
                      </span>
                      <span className="text-outline text-xs">•</span>
                      <span className="font-label-sm text-xs text-on-surface uppercase">
                        0% VLT Absolute
                      </span>
                    </div>
                    <h4 className="font-title-md text-sm font-bold text-on-surface">
                      Blackout Roller Shades (14 Active SKUs)
                    </h4>
                  </div>
                  <button
                    className="text-xs font-label-md text-on-surface hover:text-secondary uppercase tracking-wider flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-low border border-surface-container-high"
                    type="button"
                  >
                    Manage Sub-Tier{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  4-pass acrylic zero-light backing with side-rail channels.
                  Enforces automated cut-sheet generation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="flex gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high cursor-pointer hover:bg-surface-container transition-colors">
                    <div className="w-12 h-12 rounded bg-surface-container-high overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Nocturne Absolute"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8XIplzNEIYgGEyu-HkFKywh_sB7Fpyt-wqEhfTRgHUkNvgxeMdLmPgb8XFQl8rWdKFVShg0VydrPd7X2KBaBQAWq52OrT7Rh97feTZ94ErvRYyEmnQIhWz3fLWbdLaQLIIId3lUUr7ODcCk_jv7TIzIXBmb0fmGDFYuu-4e4qQ9vVIjxniWbzDOtOc6d_8-ozpP9iGbwr1BYjeejD9YoFFpv29fp8ik-0_qrfBkyT1oOxl1YeTq9DfQ"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-mono text-outline">
                        RS-BO-0902
                      </span>
                      <h5 className="text-xs font-semibold text-on-surface">
                        Nocturne Absolute
                      </h5>
                      <span className="text-[11px] text-secondary font-medium">
                        $320 · 0% VLT
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high cursor-pointer hover:bg-surface-container transition-colors">
                    <div className="w-12 h-12 rounded bg-surface-container-high overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Eclipse Dual-Roll"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3vJZUdzCxXRM1bgukI8_AqMoMwjjdhsoAfBNWDcEuCNdUXq7dr_FpXeMvU7Mqs1jPdAC5f7AjtD9jDP47SuVBRen9ak5FpFNDkBUCIISVXruYPHLm0necnUaZgXxyw8DhkfJRg1lZ6F3bUHYPCyPU7N8NxW65SLruwMSoEgDr6jkbgLHWVgYH1pDBWXjOPIy0geF2SXKhwYnn_zn0SfHvcxoDjAqrU6t5H1fEkZ0Z86OIxpaBjOB7LQ"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-mono text-outline">
                        RS-BO-0915
                      </span>
                      <h5 className="text-xs font-semibold text-on-surface">
                        Eclipse Dual-Roll
                      </h5>
                      <span className="text-[11px] text-secondary font-medium">
                        $450 · Dual Motor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* "+ Create Product" Architectural Slide-Out Modal Drawer */}
          <div
            className="fixed inset-0 z-50 pointer-events-none transition-all duration-300 opacity-0"
            id="create-product-drawer"
          >
            {/* Backdrop Scrim */}
            <div
              className="absolute inset-0 bg-primary-container/40 backdrop-blur-sm transition-opacity opacity-0"
              id="drawer-backdrop"
            ></div>
            {/* Right Drawer Content */}
            <div
              className="absolute top-0 right-0 h-full w-full max-w-xl bg-surface-container-lowest shadow-2xl p-space-md lg:p-space-lg flex flex-col justify-between transform translate-x-full transition-transform duration-300 ease-out pointer-events-auto overflow-y-auto"
              id="drawer-panel"
            >
              <div className="space-y-space-md">
                {/* Drawer Header */}
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
                {/* Hierarchy Step 1: Master Category */}
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
                {/* Hierarchy Step 2: Opacity Sub-Tier (The explicit mandate) */}
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
                {/* Hierarchy Step 3: Specific Product Identifiers */}
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
                {/* Spec Verification Ribbon */}
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
              {/* Drawer Footer Actions */}
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
        <div className="w-full px-gutter-mobile lg:px-margin flex flex-col md:flex-row items-center justify-between gap-space-sm text-xs font-body-sm text-on-surface-variant">
          <div className="flex items-center gap-space-md">
            <span className="font-headline-sm text-sm font-bold text-on-surface tracking-tight">
              SMART DECOR BACK-OFFICE CMS
            </span>
            <span className="text-outline">|</span>
            <span>
              Environment: <strong>Production (US-East-1)</strong>
            </span>
            <span className="text-outline">|</span>
            <span>
              Database Latency: <strong>14ms</strong>
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <a
              className="hover:text-on-surface transition-colors flex items-center gap-1"
              href="#"
            >
              <span className="material-symbols-outlined text-sm text-secondary">
                terminal
              </span>
              API Docs
            </a>
            <a className="hover:text-on-surface transition-colors" href="#">
              Role Permissions
            </a>
            <a className="hover:text-on-surface transition-colors" href="#">
              Export Audit Trail
            </a>
            <span className="text-outline">
              © 2025 Smart Decor Operations Admin
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
