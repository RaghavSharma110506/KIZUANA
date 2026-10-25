import { useEffect, useMemo, useState } from "react";

import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  Compass,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Menu,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
  MessageSquareText,
  Truck,
} from "lucide-react";

import { DemandPredictor, CityDemand } from "./AdvancedFeatures";
import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Sakura Spirit Collectible",
    category: "Collectibles",
    price: 1499,
    interest: 284,
    status: "Available",
    tag: "Fan favourite",
    image: "/images/sakura-spirit-collectible.png",
    description:
      "A limited-edition collectible inspired by Japanese pop culture.",
  },
  {
    id: 2,
    name: "Neo Tokyo Oversized Tee",
    category: "Apparel",
    price: 999,
    interest: 196,
    status: "Available",
    tag: "Trending",
    image: "/images/neo-tokyo-dark-tee.png",
    description: "Tokyo-inspired streetwear made for everyday fandom.",
  },
  {
    id: 3,
    name: "Manga Starter Box",
    category: "Manga",
    price: 1899,
    interest: 352,
    status: "Available",
    tag: "High demand",
    image: "/images/neo-tokyo-dark-tee.png",
    description: "A curated box for readers discovering manga.",
  },
  {
    id: 4,
    name: "Akiba Gaming Desk Mat",
    category: "Gaming",
    price: 799,
    interest: 94,
    status: "Coming soon",
    tag: "New",
    image: "/images/akiba-gaming-desk-mat.png",
    description: "Give your gaming setup a colourful upgrade.",
  },
];

const initialEvents = [
  {
    id: 1,
    name: "Tokyo Nights",
    category: "Anime & Music",
    date: "21 Nov 2026",
    location: "New Delhi",
    attendees: 428,
  },
  {
    id: 2,
    name: "Manga Makers Meetup",
    category: "Community",
    date: "08 Nov 2026",
    location: "Online",
    attendees: 163,
  },
  {
    id: 3,
    name: "Cosplay Carnival",
    category: "Cosplay",
    date: "05 Dec 2026",
    location: "Chandigarh",
    attendees: 291,
  },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Discover", icon: Compass },
  { label: "Products", icon: Package },
  { label: "Events", icon: CalendarDays },
  { label: "Audience", icon: Users },
  { label: "Demand Predictor", icon: BrainCircuit },
  { label: "City Demand", icon: MapPinned },
  { label: "Campaigns", icon: Zap },
  { label: "My Interests", icon: Heart },
  { label: "My orders", icon: ShoppingBag },
  { label: "Order Tracking", icon: Truck },
  { label: "Customer Feedback", icon: MessageSquareText },
  { label: "Settings", icon: Settings },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function loadSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
const interestOptions = [
  "Anime",
  "Manga",
  "Gaming",
  "Streetwear",
  "Collectibles",
  "Cosplay",
  "Japanese Music",
  "Community Events",
];

function matchesFanPreferences(item) {
  const selected = preferences.interests;

  // Show everything until the fan selects interests.
  if (!selected || selected.length === 0) return true;

  const itemText =
    `${item.name || ""} ${item.category || ""} ${item.description || ""}`.toLowerCase();

  const interestKeywords = {
    Anime: ["anime", "japanese pop culture"],
    Manga: ["manga"],
    Gaming: ["gaming", "game"],
    Streetwear: ["streetwear", "apparel", "tee"],
    Collectibles: ["collectible", "collectibles"],
    Cosplay: ["cosplay"],
    "Japanese Music": ["music", "tokyo nights"],
    "Community Events": ["community", "meetup", "carnival"],
  };

  return selected.some((interest) => {
    const keywords = interestKeywords[interest] || [interest.toLowerCase()];

    return keywords.some((keyword) => itemText.includes(keyword));
  });
}
function Brand() {
  return (
    <div className="brand">
      <span className="brand-symbol">絆</span>
      <span>
        KIZUNA <b>INSIGHT</b>
      </span>
    </div>
  );
}

function Button({ children, onClick, variant = "primary", icon: Icon }) {
  return (
    <button className={`button button-${variant}`} onClick={onClick}>
      {Icon && <Icon size={17} />}
      <span>{children}</span>
    </button>
  );
}

function MetricCard({ icon: Icon, label, value, change, accent }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${accent}`}>
        <Icon size={20} />
      </div>
      <span className="muted metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      <span className="metric-change">
        <TrendingUp size={14} /> {change}
      </span>
    </article>
  );
}

function ProductCard({ product, favorite, onFavorite, onInterest, onOrder }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
          }}
        />
        <span className="product-tag">{product.tag}</span>
        <button
          className={`favorite-button ${favorite ? "is-favorite" : ""}`}
          onClick={() => onFavorite(product)}
          aria-label="Toggle favorite"
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-content">
        <span className="eyebrow">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-meta">
          <strong>{money(product.price)}</strong>
          <span>
            <Users size={14} /> {product.interest}
          </span>
        </div>

        <div className="product-actions">
          <Button variant="secondary" onClick={() => onInterest(product)}>
            <Sparkles size={16} />
            Interested
          </Button>
          <Button onClick={() => onOrder(product)}>
            <ShoppingBag size={16} />
            Demo order
          </Button>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <Sparkles size={28} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
function KizunaAuth({ onLogin }) {
  const [portal, setPortal] = useState("");
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function choosePortal(nextPortal) {
    setPortal(nextPortal);
    setMode("login");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (mode === "register") {
      if (password.length < 8) {
        setError("Password must contain at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setError(
        "Registration is currently a demo. Connect a backend to create accounts.",
      );
      return;
    }

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Demo-only login. This does not verify credentials.
    onLogin(portal);
  }

  return (
    <div className="kz-auth">
      <video className="kizuna-video-bg" autoPlay muted loop playsInline>
        <source src="/kizuna-forest.mp4" type="video/mp4" />
      </video>

      <header className="kz-auth-header">
        <button
          className="kz-brand"
          onClick={() => {
            setPortal("");
            setMode("login");
            setError("");
          }}
        >
          <span className="kz-brand-symbol">絆</span>
          KIZUNA <span className="kz-brand-muted">INSIGHT</span>
        </button>

        {portal && (
          <button
            className="kz-back"
            onClick={() => {
              setPortal("");
              setMode("login");
              setError("");
            }}
          >
            ← Change portal
          </button>
        )}
      </header>

      {!portal ? (
        <section className="kz-auth-main">
          <span className="kz-eyebrow">WELCOME TO KIZUNA</span>
          <h1>
            Where fandom meets
            <span className="kz-gradient"> opportunity.</span>
          </h1>
          <p className="kz-intro">
            Choose your portal to discover your community or build experiences
            for it.
          </p>

          <div className="kz-portal-grid">
            <button
              className="kz-portal-card kz-fan"
              onClick={() => choosePortal("fan")}
            >
              <span className="kz-card-icon">♡</span>
              <span className="kz-card-label">FOR FANS & COLLECTORS</span>
              <strong>Fan Portal</strong>
              <span className="kz-card-description">
                Discover products, vote on launches, explore events, and earn
                rewards.
              </span>
              <span className="kz-card-link">Continue as a fan →</span>
            </button>

            <button
              className="kz-portal-card kz-business"
              onClick={() => choosePortal("company")}
            >
              <span className="kz-card-icon">▦</span>
              <span className="kz-card-label">FOR COMPANIES & ORGANIZERS</span>
              <strong>Business Portal</strong>
              <span className="kz-card-description">
                Manage products, understand audience demand, and organize
                campaigns and events.
              </span>
              <span className="kz-card-link">Continue as a business →</span>
            </button>
          </div>

          <p className="kz-auth-note">
            One community. Two ways to make an impact.
          </p>
        </section>
      ) : (
        <section className="kz-form-card">
          <div className="kz-form-heading">
            <span className="kz-eyebrow">
              {portal === "fan" ? "FAN PORTAL" : "BUSINESS PORTAL"}
            </span>

            <h1>{mode === "login" ? "Welcome back." : "Join KIZUNA."}</h1>

            <p>
              {mode === "login"
                ? `Sign in to your ${
                    portal === "fan" ? "fan" : "business"
                  } account.`
                : `Create your ${
                    portal === "fan" ? "fan" : "business"
                  } account.`}
            </p>
          </div>

          <form className="kz-form" onSubmit={handleSubmit}>
            {mode === "register" && (
              <>
                <label htmlFor="kz-name">Full name</label>
                <input
                  id="kz-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />

                {portal === "company" && (
                  <>
                    <label htmlFor="kz-organization">
                      Company or organization name
                    </label>
                    <input
                      id="kz-organization"
                      value={organization}
                      onChange={(event) => setOrganization(event.target.value)}
                      placeholder="Company or event organization"
                      autoComplete="organization"
                      required
                    />
                  </>
                )}
              </>
            )}

            <label htmlFor="kz-email">Email address</label>
            <input
              id="kz-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <label htmlFor="kz-password">Password</label>
            <div className="kz-password-wrap">
              <input
                id="kz-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={
                  mode === "register"
                    ? "At least 8 characters"
                    : "Enter your password"
                }
                autoComplete={
                  mode === "register" ? "new-password" : "current-password"
                }
                minLength={mode === "register" ? 8 : undefined}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {mode === "register" && (
              <>
                <label htmlFor="kz-confirm-password">Confirm password</label>
                <input
                  id="kz-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                />
              </>
            )}

            {error && (
              <p className="kz-error" role="alert">
                {error}
              </p>
            )}

            <button className="kz-submit" type="submit">
              {mode === "login" ? "Sign in →" : "Create account →"}
            </button>
          </form>

          <p className="kz-form-switch">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode((current) =>
                  current === "login" ? "register" : "login",
                );
                setError("");
              }}
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>

          <p className="kz-auth-note">
            {portal === "fan"
              ? "Your fandom. Your voice. Your community."
              : "Better insights. Better launches. Stronger connections."}
          </p>
        </section>
      )}

      <footer className="kz-auth-footer">
        © 2026 KIZUNA Insight · From fandom to insight.
      </footer>
    </div>
  );
}
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("kizuna_demo_authenticated") === "true",
  );
  const [role, setRole] = useState(() => loadSaved("kizuna_role", "company"));
  const [page, setPage] = useState(() => loadSaved("kizuna_page", "Overview"));
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState("");

  const [products, setProducts] = useState(() =>
    loadSaved("kizuna_products", initialProducts),
  );

  const [events] = useState(() => loadSaved("kizuna_events", initialEvents));

  const [favorites, setFavorites] = useState(() =>
    loadSaved("kizuna_favorites", []),
  );

  const [orders, setOrders] = useState(() => loadSaved("kizuna_orders", []));

  const [interests, setInterests] = useState(() =>
    loadSaved("kizuna_interests", []),
  );
  const [preferences, setPreferences] = useState(() =>
    loadSaved("kizuna_preferences", { interests: [] }),
  );

  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Collectibles",
    price: "",
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("kizuna_role", JSON.stringify(role));
  }, [role]);
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("kizuna_page", JSON.stringify(page));
    }
  }, [page, isAuthenticated]);
  useEffect(() => {
    localStorage.setItem("kizuna_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("kizuna_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("kizuna_orders", JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem("kizuna_preferences", JSON.stringify(preferences));
  }, [preferences]);
  useEffect(() => {
    localStorage.setItem("kizuna_interests", JSON.stringify(interests));
  }, [interests]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(""), 2600);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = (message) => setToast(message);
  const isCompany = role === "company";
  function matchesFanPreferences(item) {
    const selected = preferences.interests;

    // Show everything until the fan selects interests.
    if (!selected || selected.length === 0) return true;

    const itemText =
      `${item.name || ""} ${item.category || ""} ${item.description || ""}`.toLowerCase();

    const interestKeywords = {
      Anime: ["anime", "japanese pop culture"],
      Manga: ["manga"],
      Gaming: ["gaming", "game"],
      Streetwear: ["streetwear", "apparel", "tee"],
      Collectibles: ["collectible", "collectibles"],
      Cosplay: ["cosplay"],
      "Japanese Music": ["music", "tokyo nights"],
      "Community Events": ["community", "meetup", "carnival"],
    };

    return selected.some((interest) => {
      const keywords = interestKeywords[interest] || [interest.toLowerCase()];

      return keywords.some((keyword) => itemText.includes(keyword));
    });
  }
  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPage =
        (page !== "Favorites" || favorites.includes(product.id)) &&
        (isCompany || matchesFanPreferences(product));
      return matchesSearch && matchesCategory && matchesPage;
    });
  }, [products, search, category, page, favorites, isCompany, preferences]);

  const totalInterest = products.reduce(
    (total, product) => total + Number(product.interest || 0),
    0,
  );

  const estimatedRevenue = orders.reduce(
    (total, order) => total + order.price,
    0,
  );

  function toggleFavorite(product) {
    const alreadySaved = favorites.includes(product.id);

    setFavorites((current) =>
      alreadySaved
        ? current.filter((id) => id !== product.id)
        : [...current, product.id],
    );

    notify(alreadySaved ? "Removed from favorites" : "Added to favorites");
  }

  function registerInterest(product) {
    if (interests.includes(product.id)) {
      notify("You have already registered interest");
      return;
    }

    setInterests((current) => [...current, product.id]);

    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? { ...item, interest: item.interest + 1 }
          : item,
      ),
    );

    notify("Your interest has been recorded");
  }

  function placeDemoOrder(product) {
    const order = {
      id: `KZ-${Date.now().toString().slice(-7)}`,
      productId: product.id,
      product: product.name,
      price: product.price,
      date: new Date().toISOString(),
      status: "Demo order",
    };

    setOrders((current) => [order, ...current]);
    notify("Demo order placed — no payment was charged");
  }

  function addProduct(event) {
    event.preventDefault();

    const product = {
      id: Date.now(),
      name: newProduct.name.trim(),
      category: newProduct.category,
      price: Number(newProduct.price),
      interest: 0,
      status: "Coming soon",
      tag: "New launch",
      image:
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=85",
      description: newProduct.description.trim(),
    };

    if (!product.name || !product.description || product.price <= 0) {
      notify("Please complete all product details");
      return;
    }

    setProducts((current) => [product, ...current]);

    setNewProduct({
      name: "",
      category: "Collectibles",
      price: "",
      description: "",
    });

    setShowProductForm(false);
    setPage("Products");
    notify("Product added successfully");
  }

  function registerEvent(event) {
    if (eventRegistrations.includes(event.id)) {
      notify("You have already registered for this event");
      return;
    }

    setEventRegistrations((current) => [...current, event.id]);
    notify(`Registered for ${event.name}`);
  }

  function handleLogout() {
    sessionStorage.removeItem("kizuna_demo_authenticated");
    setIsAuthenticated(false);
    setMobileMenu(false);
    setPage("Overview");
    setSearch("");
    setCategory("All");
  }

  function changePage(nextPage) {
    setPage(nextPage);
    setMobileMenu(false);
    setSearch("");
    setCategory("All");
  }
  function changePage(nextPage) {
  setPage(nextPage);
  setMobileMenu(false);
  setSearch("");
  setCategory("All");
}

// PASTE switchRole() HERE
// function switchRole(nextRole) {
//   setRole(nextRole);
//   setPage(
//     nextRole === "company"
//       ? "Overview"
//       : preferences.interests.length === 0
//         ? "My Interests"
//         : "Discover",
//   );
//   setMobileMenu(false);
//   setSearch("");
//   setCategory("All");
// }

  const pageTitle =
    page === "Overview"
      ? isCompany
        ? "Business overview"
        : "Your fandom, your way"
      : page;
  if (!isAuthenticated) {
    return (
      <KizunaAuth
        onLogin={(selectedPortal) => {
          const nextRole = selectedPortal === "company" ? "company" : "fan";

          sessionStorage.setItem("kizuna_demo_authenticated", "true");
          localStorage.setItem("kizuna_role", JSON.stringify(nextRole));

          setRole(nextRole);
          setPage(
            nextRole === "company"
              ? "Overview"
              : preferences.interests.length === 0
                ? "My Interests"
                : "Discover",
          );
          setIsAuthenticated(true);
        }}
      />
    );
  }
  return (
    <div className="app-shell">
      <video
        className="kizuna-dashboard-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/kizuna-forest.mp4" type="video/mp4" />
      </video>
      <div className="kizuna-dashboard-overlay" aria-hidden="true" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <Brand />
          <button
            className="icon-button sidebar-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        {/* <div className="role-switcher">
          <button
            className={isCompany ? "role-active" : ""}
            onClick={() => switchRole("company")}
          >
            <Activity size={16} />
            Company
          </button>

          <button
            className={!isCompany ? "role-active" : ""}
            onClick={() => switchRole("fan")}
          >
            <Heart size={16} />
            Fan portal
          </button>
        </div> */}

        <div className="workspace-label nav-heading">MENU</div>

        <nav className="side-nav">
          {navItems
            .filter((item) => {
              if (isCompany) {
                return !["Discover", "My orders", "My Interests"].includes(
                  item.label,
                );
              }

              return ![
                "Audience",
                "Demand Predictor",
                "City Demand",
                "Campaigns",
                "Settings",
              ].includes(item.label);
            })
            .map(({ label, icon: Icon }) => (
              <button
                key={label}
                className={`nav-link ${page === label ? "nav-active" : ""}`}
                onClick={() => changePage(label)}
              >
                <Icon size={18} />
                <span>{label}</span>
                {page === label && <span className="nav-indicator" />}
              </button>
            ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-promo">
            <div className="promo-icon">
              <Sparkles size={18} />
            </div>
            <strong>Built around fandom.</strong>
            <p>Better signals. Better launches. Stronger connections.</p>
          </div>

          <div className="account-row">
            <div className="avatar">{isCompany ? "K" : "F"}</div>
            <div className="account-copy">
              <strong>{isCompany ? "Kizuna Studio" : "Fan Guest"}</strong>
              <span>{isCompany ? "Company account" : "Community member"}</span>
            </div>
            <button
              className="icon-button logout-button"
              title="Logout"
              aria-label="Logout"
              onClick={handleLogout}
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
          aria-label="Close menu"
        />
      )}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu-button"
              onClick={() => setMobileMenu(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div>
              <div className="breadcrumb">KIZUNA / {page.toUpperCase()}</div>
              <h1>{pageTitle}</h1>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="topbar-date">
              <span className="live-dot" />
              DEMO ENVIRONMENT
            </div>

            <button
              className="icon-button notification-button"
              onClick={() => notify("You are all caught up")}
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span />
            </button>

            <button
              className="avatar top-avatar"
              title="Switch portal"
              onClick={() => {
                sessionStorage.removeItem("kizuna_demo_authenticated");
                setIsAuthenticated(false);
              }}
            >
              {isCompany ? "K" : "F"}
            </button>
          </div>
        </header>

        <section className="page-content animate-in">
          {page === "Overview" && (
            <>
              <section className="welcome-banner">
                <div className="welcome-copy">
                  <div className="eyebrow">
                    <Sparkles size={14} />{" "}
                    {isCompany ? "INSIGHT STUDIO" : "KIZUNA COMMUNITY"}
                  </div>

                  <h2>
                    {isCompany ? (
                      <>
                        Turn fan energy into{" "}
                        <span className="gradient-text">real insight.</span>
                      </>
                    ) : (
                      <>
                        Your next favourite thing is{" "}
                        <span className="gradient-text">waiting.</span>
                      </>
                    )}
                  </h2>

                  <p>
                    {isCompany
                      ? "Understand what your audience wants, validate demand and plan smarter launches for India."
                      : "Explore upcoming launches, discover products and help shape the fandom experiences you love."}
                  </p>

                  <Button
                    onClick={() =>
                      changePage(isCompany ? "Audience" : "Discover")
                    }
                  >
                    {isCompany
                      ? "Explore audience insights"
                      : "Explore products"}
                    <ArrowRight size={17} />
                  </Button>
                </div>

                <div className="welcome-art" aria-hidden="true">
                  <div className="art-orbit orbit-one" />
                  <div className="art-orbit orbit-two" />
                  <div className="art-core">絆</div>
                  <span className="art-spark spark-a">✦</span>
                  <span className="art-spark spark-b">✧</span>
                  <span className="art-spark spark-c">✦</span>
                </div>

                <span className="banner-decoration">KIZUNA</span>
              </section>

              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR PERFORMANCE</span>
                  <h2>
                    {isCompany
                      ? "Business at a glance"
                      : "Your community activity"}
                  </h2>
                </div>
                <span className="period-chip">Updated just now</span>
              </div>

              <div className="metrics-grid">
                <MetricCard
                  icon={Users}
                  label={
                    isCompany ? "Fan interest signals" : "Community interest"
                  }
                  value={totalInterest.toLocaleString("en-IN")}
                  change="+12.8% this month"
                  accent="accent-purple"
                />

                <MetricCard
                  icon={Package}
                  label="Products listed"
                  value={products.length}
                  change={`${
                    products.filter((p) => p.status === "Available").length
                  } available`}
                  accent="accent-pink"
                />

                <MetricCard
                  icon={CalendarDays}
                  label="Upcoming events"
                  value={events.length}
                  change="Across 3 communities"
                  accent="accent-blue"
                />

                <MetricCard
                  icon={ShoppingBag}
                  label={isCompany ? "Demo order value" : "My demo orders"}
                  value={isCompany ? money(estimatedRevenue) : orders.length}
                  change="Prototype data"
                  accent="accent-green"
                />
              </div>

              <div className="dashboard-grid">
                <section className="panel weekly-chart-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="eyebrow">WEEKLY PERFORMANCE</span>
                      <h3>Interest trend</h3>
                      <p className="muted">
                        Illustrative weekly activity — not live analytics.
                      </p>
                    </div>
                    <span className="icon-chip">
                      <TrendingUp size={18} />
                    </span>
                  </div>

                  <div className="weekly-chart">
                    {[
                      { day: "Mon", value: 38 },
                      { day: "Tue", value: 52 },
                      { day: "Wed", value: 44 },
                      { day: "Thu", value: 68 },
                      { day: "Fri", value: 57 },
                      { day: "Sat", value: 86 },
                      { day: "Sun", value: 72 },
                    ].map((item) => (
                      <div className="weekly-chart-column" key={item.day}>
                        <strong>{item.value}</strong>
                        <div className="weekly-bar-track">
                          <div
                            className="weekly-bar-fill"
                            style={{ height: `${item.value}%` }}
                          />
                        </div>
                        <span>{item.day}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="panel chart-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="eyebrow">AUDIENCE ACTIVITY</span>
                      <h3>Interest across categories</h3>
                    </div>
                    <span className="icon-chip">
                      <BarChart3 size={18} />
                    </span>
                  </div>

                  <div className="category-bars">
                    {["Collectibles", "Apparel", "Manga", "Gaming"].map(
                      (name, index) => {
                        const amount = products
                          .filter((product) => product.category === name)
                          .reduce(
                            (total, product) => total + product.interest,
                            0,
                          );

                        const fallback = [284, 196, 352, 94][index];
                        const value = amount || fallback;
                        const maxValue = Math.max(
                          ...products.map((product) => product.interest),
                          1,
                        );

                        return (
                          <div className="bar-row" key={name}>
                            <div className="bar-label">
                              <span>{name}</span>
                              <strong>{value}</strong>
                            </div>
                            <div className="bar-track">
                              <div
                                className={`bar-fill bar-${index}`}
                                style={{
                                  width: `${Math.min(
                                    (value / maxValue) * 100,
                                    100,
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>

                  <div className="chart-footer">
                    <span>
                      <span className="live-dot" /> Based on demo interest
                      signals
                    </span>
                    <span>Illustrative analytics</span>
                  </div>
                </section>

                <section className="panel activity-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="eyebrow">WHAT'S HAPPENING</span>
                      <h3>Upcoming events</h3>
                    </div>
                    <button
                      className="text-link"
                      onClick={() => changePage("Events")}
                    >
                      View all <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="event-list">
                    {events.slice(0, 3).map((event, index) => (
                      <div className="event-row" key={event.id}>
                        <div className={`event-date event-date-${index}`}>
                          <CalendarDays size={19} />
                        </div>
                        <div className="event-copy">
                          <strong>{event.name}</strong>
                          <span>
                            {event.date} · {event.location}
                          </span>
                        </div>
                        <span className="event-count">{event.attendees}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="section-heading product-section-heading">
                <div>
                  <span className="eyebrow">CURATED FOR KIZUNA</span>
                  <h2>
                    {isCompany ? "Products to watch" : "Trending with fans"}
                  </h2>
                </div>
                <button
                  className="text-link"
                  onClick={() => changePage("Products")}
                >
                  View products <ArrowRight size={15} />
                </button>
              </div>

              <div className="product-grid">
                {products.slice(0, 3).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    favorite={favorites.includes(product.id)}
                    onFavorite={toggleFavorite}
                    onInterest={registerInterest}
                    onOrder={placeDemoOrder}
                  />
                ))}
              </div>
            </>
          )}

          {(page === "Discover" ||
            page === "Products" ||
            page === "Favorites") && (
            <>
              <section className="page-intro">
                <div>
                  <span className="eyebrow">THE KIZUNA COLLECTION</span>
                  <h2>
                    {page === "Favorites"
                      ? "Your saved collection"
                      : page === "Discover"
                        ? "Discover something extraordinary."
                        : isCompany
                          ? "Manage your product lineup."
                          : "Find your next favourite."}
                  </h2>
                  <p>
                    {page === "Favorites"
                      ? "Everything you have saved, all in one place."
                      : "Explore the products fans are talking about and help shape future launches."}
                  </p>
                </div>

                {isCompany && page === "Products" && (
                  <Button onClick={() => setShowProductForm(true)}>
                    <Plus size={17} /> Add product
                  </Button>
                )}
              </section>

              {showProductForm && (
                <form className="panel add-product-form" onSubmit={addProduct}>
                  <div className="panel-heading">
                    <h3>Add a product</h3>
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => setShowProductForm(false)}
                      aria-label="Close form"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <label>
                    Product name
                    <input
                      required
                      value={newProduct.name}
                      onChange={(event) =>
                        setNewProduct({
                          ...newProduct,
                          name: event.target.value,
                        })
                      }
                      placeholder="e.g. Sakura collectible"
                    />
                  </label>

                  <div className="form-two">
                    <label>
                      Category
                      <select
                        value={newProduct.category}
                        onChange={(event) =>
                          setNewProduct({
                            ...newProduct,
                            category: event.target.value,
                          })
                        }
                      >
                        <option>Collectibles</option>
                        <option>Apparel</option>
                        <option>Manga</option>
                        <option>Gaming</option>
                      </select>
                    </label>

                    <label>
                      Price (₹)
                      <input
                        required
                        min="1"
                        type="number"
                        value={newProduct.price}
                        onChange={(event) =>
                          setNewProduct({
                            ...newProduct,
                            price: event.target.value,
                          })
                        }
                        placeholder="1499"
                      />
                    </label>
                  </div>

                  <label>
                    Description
                    <textarea
                      required
                      rows="3"
                      value={newProduct.description}
                      onChange={(event) =>
                        setNewProduct({
                          ...newProduct,
                          description: event.target.value,
                        })
                      }
                      placeholder="Describe your product..."
                    />
                  </label>

                  <Button>Save product</Button>
                </form>
              )}

              <div className="product-toolbar">
                <label className="search-box">
                  <Search size={18} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products..."
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </label>

                <label className="category-select">
                  <span>Category</span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option>All</option>
                    <option>Collectibles</option>
                    <option>Apparel</option>
                    <option>Manga</option>
                    <option>Gaming</option>
                  </select>
                  <ChevronDown size={15} />
                </label>
              </div>

              {visibleProducts.length > 0 ? (
                <div className="product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      favorite={favorites.includes(product.id)}
                      onFavorite={toggleFavorite}
                      onInterest={registerInterest}
                      onOrder={placeDemoOrder}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Nothing found just yet"
                  description="Try another search or category, or save new favourites as you explore."
                />
              )}
            </>
          )}

          {page === "Events" && (
            <>
              <section className="page-intro">
                <div>
                  <span className="eyebrow">MEET YOUR COMMUNITY</span>
                  <h2>Experiences bring fandom together.</h2>
                  <p>
                    Discover meetups, festivals and experiences across India.
                  </p>
                </div>
              </section>

              <div className="events-grid">
                {(isCompany
                  ? events
                  : events.filter((event) => matchesFanPreferences(event))
                ).map((event, index) => {
                  const registered = eventRegistrations.includes(event.id);

                  return (
                    <article className="event-card" key={event.id}>
                      <div className={`event-art event-art-${index}`}>
                        <span>絆</span>
                        <span className="event-art-caption">
                          KIZUNA COMMUNITY
                        </span>
                      </div>

                      <div className="event-card-body">
                        <span className="eyebrow">{event.category}</span>
                        <h3>{event.name}</h3>
                        <p>
                          <CalendarDays size={15} /> {event.date}
                        </p>
                        <p>
                          <Compass size={15} /> {event.location}
                        </p>
                        <p>
                          <Users size={15} /> {event.attendees} interested
                        </p>

                        <Button
                          variant={registered ? "secondary" : "primary"}
                          onClick={() => registerEvent(event)}
                        >
                          {registered ? (
                            <>
                              <Check size={16} /> Registered
                            </>
                          ) : (
                            <>
                              Register interest <ArrowRight size={16} />
                            </>
                          )}
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
          {page === "My Interests" && !isCompany && (
            <section className="page-intro">
              <div>
                <span className="eyebrow">PERSONALISE YOUR EXPERIENCE</span>
                <h2>What are you a fan of?</h2>
                <p>
                  Choose your interests to see products and events relevant to
                  you.
                </p>

                <div className="interest-options">
                  {interestOptions.map((interest) => {
                    const selected = preferences.interests.includes(interest);

                    return (
                      <button
                        key={interest}
                        type="button"
                        className={`interest-option ${selected ? "selected" : ""}`}
                        onClick={() =>
                          setPreferences((current) => ({
                            ...current,
                            interests: selected
                              ? current.interests.filter(
                                  (item) => item !== interest,
                                )
                              : [...current.interests, interest],
                          }))
                        }
                      >
                        {selected ? "✓ " : "+ "}
                        {interest}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="primary"
                  onClick={() => {
                    changePage("Discover");
                    notify("Your interests have been saved");
                  }}
                >
                  Save interests and explore <ArrowRight size={16} />
                </Button>
              </div>
            </section>
          )}

          {page === "Audience" && isCompany && (
            <>
              <section className="page-intro">
                <div>
                  <span className="eyebrow">AUDIENCE INTELLIGENCE</span>
                  <h2>Listen to what your fans want.</h2>
                  <p>
                    Understand category interest and use demand signals to guide
                    launch planning.
                  </p>
                </div>
              </section>

              <div className="metrics-grid">
                <MetricCard
                  icon={Users}
                  label="Total interest signals"
                  value={totalInterest.toLocaleString("en-IN")}
                  change="Across product categories"
                  accent="accent-purple"
                />
                <MetricCard
                  icon={Heart}
                  label="Saved favourites"
                  value={favorites.length}
                  change="In this browser"
                  accent="accent-pink"
                />
                <MetricCard
                  icon={Activity}
                  label="Interest registrations"
                  value={interests.length}
                  change="Unique products followed"
                  accent="accent-blue"
                />
                <MetricCard
                  icon={TrendingUp}
                  label="Demo order value"
                  value={money(estimatedRevenue)}
                  change="Not actual revenue"
                  accent="accent-green"
                />
              </div>

              <section className="panel audience-panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">CATEGORY SIGNALS</span>
                    <h3>Where demand is building</h3>
                  </div>
                  <span className="icon-chip">
                    <BarChart3 size={19} />
                  </span>
                </div>

                {["Collectibles", "Apparel", "Manga", "Gaming"].map(
                  (name, index) => {
                    const value = products
                      .filter((product) => product.category === name)
                      .reduce((total, product) => total + product.interest, 0);

                    return (
                      <div className="audience-row" key={name}>
                        <div className="audience-row-head">
                          <span>{name}</span>
                          <strong>{value} signals</strong>
                        </div>
                        <div className="bar-track">
                          <div
                            className={`bar-fill bar-${index}`}
                            style={{
                              width: `${Math.min(
                                (value / Math.max(totalInterest, 1)) * 100,
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  },
                )}

                <p className="disclaimer">
                  These are illustrative prototype metrics derived from the
                  local demo data, not live market research.
                </p>
              </section>
            </>
          )}

          {/* NEW: Demand Predictor page */}
          {page === "Demand Predictor" && isCompany && <DemandPredictor />}

          {/* NEW: City Demand page */}
          {page === "City Demand" && isCompany && <CityDemand />}

          {page === "Campaigns" && isCompany && (
            <>
              <section className="page-intro">
                <div>
                  <span className="eyebrow">LAUNCH PLANNING</span>
                  <h2>Build campaigns around real interest.</h2>
                  <p>
                    Use the prototype's product signals to decide what to
                    promote next.
                  </p>
                </div>
              </section>

              <div className="campaign-grid">
                {products.map((product) => (
                  <article className="panel campaign-card" key={product.id}>
                    <div className="campaign-top">
                      <span className="icon-chip">
                        <Zap size={18} />
                      </span>
                      <span className="status-chip">{product.status}</span>
                    </div>
                    <span className="eyebrow">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="campaign-stat">
                      <strong>{product.interest}</strong>
                      <span>interest signals</span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill bar-0"
                        style={{
                          width: `${Math.min(product.interest / 4, 100)}%`,
                        }}
                      />
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        notify(`Campaign idea saved for ${product.name}`)
                      }
                    >
                      Save campaign idea <ArrowRight size={16} />
                    </Button>
                  </article>
                ))}
              </div>
            </>
          )}

          {page === "My orders" && !isCompany && (
            <>
              <section className="page-intro">
                <div>
                  <span className="eyebrow">YOUR ACTIVITY</span>
                  <h2>Your demo order history.</h2>
                  <p>
                    Orders are simulated for this prototype. No payments are
                    processed.
                  </p>
                </div>
              </section>

              {orders.length ? (
                <section className="panel orders-panel">
                  {orders.map((order) => (
                    <div className="order-row" key={order.id}>
                      <div className="order-icon">
                        <ShoppingBag size={20} />
                      </div>
                      <div className="order-copy">
                        <strong>{order.product}</strong>
                        <span>
                          {order.id} ·{" "}
                          {new Date(order.date).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                      <strong>{money(order.price)}</strong>
                      <span className="status-chip">{order.status}</span>
                    </div>
                  ))}
                </section>
              ) : (
                <EmptyState
                  title="Your story starts here"
                  description="Explore products and place a demo order to see it appear here."
                />
              )}
            </>
          )}

          {page === "Customer Feedback" && isCompany && (
            <>
              <section className="page-intro">
                <div>
                  <span className="eyebrow">VOICE OF THE CUSTOMER</span>
                  <h2>Customer feedback</h2>
                  <p>
                    Review sample customer ratings and comments to identify
                    opportunities for better products and launches.
                  </p>
                </div>
              </section>

              <div className="feedback-summary-grid">
                <article className="panel feedback-summary-card">
                  <span>Average rating</span>
                  <strong>4.6 / 5</strong>
                  <small>Illustrative sample feedback</small>
                </article>
                <article className="panel feedback-summary-card">
                  <span>Feedback received</span>
                  <strong>128</strong>
                  <small>Demo records only</small>
                </article>
                <article className="panel feedback-summary-card">
                  <span>Positive feedback</span>
                  <strong>86%</strong>
                  <small>Sample sentiment estimate</small>
                </article>
              </div>

              <section className="panel feedback-list">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">RECENT RESPONSES</span>
                    <h3>What customers are saying</h3>
                  </div>
                </div>

                {[
                  {
                    name: "Aarav S.",
                    product: "Sakura Spirit Collectible",
                    rating: 5,
                    comment:
                      "Great design and packaging. Would love more collectibles.",
                    sentiment: "Positive",
                  },
                  {
                    name: "Meera K.",
                    product: "Manga Starter Box",
                    rating: 4,
                    comment:
                      "Good selection. More genre options would be helpful.",
                    sentiment: "Positive",
                  },
                  {
                    name: "Rohan P.",
                    product: "Neo Tokyo Oversized Tee",
                    rating: 3,
                    comment:
                      "Nice design, but additional size options would be useful.",
                    sentiment: "Needs attention",
                  },
                ].map((item) => (
                  <article className="feedback-row" key={item.name}>
                    <div className="feedback-avatar">{item.name.charAt(0)}</div>
                    <div className="feedback-content">
                      <div className="feedback-heading">
                        <strong>{item.name}</strong>
                        <span className="feedback-rating">
                          {"★".repeat(item.rating)}
                          <span>{"★".repeat(5 - item.rating)}</span>
                        </span>
                      </div>
                      <span className="feedback-product">{item.product}</span>
                      <p>{item.comment}</p>
                      <span className="feedback-sentiment">
                        {item.sentiment}
                      </span>
                    </div>
                  </article>
                ))}
                <p className="disclaimer">
                  These are fictional examples for the prototype, not actual
                  customer reviews or measured sentiment.
                </p>
              </section>
            </>
          )}

          {page === "Order Tracking" && isCompany && (
            <>
              <section className="page-intro">
                <div>
                  <span className="eyebrow">FULFILMENT OVERVIEW</span>
                  <h2>Order tracking</h2>
                  <p>
                    Review demo orders and their current status. Live courier
                    tracking is not connected.
                  </p>
                </div>
              </section>

              <div className="feedback-summary-grid">
                <article className="panel feedback-summary-card">
                  <span>Total demo orders</span>
                  <strong>{orders.length}</strong>
                  <small>Orders in this session's data</small>
                </article>
                <article className="panel feedback-summary-card">
                  <span>Awaiting fulfilment</span>
                  <strong>
                    {
                      orders.filter((order) => order.status === "Demo order")
                        .length
                    }
                  </strong>
                  <small>Demo orders without live status updates</small>
                </article>
                <article className="panel feedback-summary-card">
                  <span>Demo order value</span>
                  <strong>
                    {money(orders.reduce((sum, order) => sum + order.price, 0))}
                  </strong>
                  <small>Not actual revenue</small>
                </article>
              </div>

              <section className="panel tracking-list">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">ORDER ACTIVITY</span>
                    <h3>Order status</h3>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="tracking-empty">
                    <Truck size={32} />
                    <h3>No demo orders yet</h3>
                    <p>Orders placed from the Fan Portal will appear here.</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <article className="tracking-row" key={order.id}>
                      <div className="tracking-icon">
                        <Package size={20} />
                      </div>
                      <div className="tracking-info">
                        <strong>{order.product}</strong>
                        <span>
                          {order.id} ·{" "}
                          {new Date(order.date).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                      <strong className="tracking-price">
                        {money(order.price)}
                      </strong>
                      <span className="tracking-status">{order.status}</span>
                    </article>
                  ))
                )}
              </section>
            </>
          )}

          {page === "Settings" && isCompany && (
            <>
              <section className="page-intro">
                <div>
                  <span className="eyebrow">PREFERENCES</span>
                  <h2>Your KIZUNA workspace.</h2>
                  <p>Manage this local prototype and its demo data.</p>
                </div>
              </section>

              <section className="panel settings-panel">
                <div>
                  <h3>Workspace mode</h3>
                  <p>Switch between the company dashboard and fan portal.</p>
                </div>

                <div className="settings-actions">
                  <Button
                    variant="secondary"
                    onClick={() => switchRole("company")}
                  >
                    Company portal
                  </Button>
                  <Button variant="secondary" onClick={() => switchRole("fan")}>
                    Fan portal
                  </Button>
                </div>

                <div className="settings-divider" />

                <div>
                  <h3>Reset demo data</h3>
                  <p>
                    Restore the original sample products and clear saved demo
                    activity.
                  </p>
                </div>

                <Button
                  variant="danger"
                  onClick={() => {
                    setProducts(initialProducts);
                    setFavorites([]);
                    setOrders([]);
                    setInterests([]);
                    setPreferences({ interests: [] });
                    setEventRegistrations([]);

                    Object.keys(localStorage)
                      .filter((key) => key.startsWith("kizuna_"))
                      .forEach((key) => localStorage.removeItem(key));

                    notify("Demo data has been reset");
                    
                  }}
                  
                >
                  Reset local demo data
                </Button>
              </section>
            </>
          )}

          {/* Both advanced pages are included above, so they won't show
              the generic "coming next" placeholder. */}
          {![
            "Overview",
            "Discover",
            "Products",
            "Favorites",
            "Events",
            "Audience",
            "Demand Predictor",
            "City Demand",
            "Campaigns",
            "My orders",
            "Settings",
          ].includes(page) && (
            <EmptyState
              title={`${page} is coming next`}
              description="This section can be connected to your existing page components in the next integration step."
            />
          )}
        </section>

        <footer className="app-footer">
          <span>© 2026 KIZUNA Insight</span>
          <span>
            <Sparkles size={14} /> From fandom to insight.
          </span>
          <span className="footer-demo">DEMO PROTOTYPE</span>
        </footer>
      </main>

      {toast && (
        <div className="toast-message">
          <Check size={18} />
          {toast}
          <button onClick={() => setToast("")} aria-label="Dismiss message">
            <X size={15} />
          </button>
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
