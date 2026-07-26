console.log("読み込まれました");

// Loading
const loading = document.querySelector("#loading");

if (loading) {

  const visited = sessionStorage.getItem("visited");

  if (!visited) {

    // 初回のみ表示
    window.addEventListener("load", () => {

      setTimeout(() => {

        loading.classList.add("fadeout");

        sessionStorage.setItem("visited", "true");

      }, 3500);

    });

  } else {

    // 2回目以降はすぐ消す
    loading.style.display = "none";

  }

}

// Contact 紙飛行機アニメーション
const contactBtn = document.querySelector(".contact .btn");
const plane = document.querySelector(".contact .top_plane");

if (contactBtn && plane) {

  contactBtn.addEventListener("mouseenter", () => {
    plane.classList.remove("fly");
    void plane.offsetWidth;
    plane.classList.add("fly");
  });

  contactBtn.addEventListener("mouseleave", () => {
    plane.classList.remove("fly");
  });

}

// Concept 蝶々アニメーション
const conceptBtn = document.querySelector(".concept .btn");
const butterfly = document.querySelector(".butterfly");

if (conceptBtn && butterfly) {

  conceptBtn.addEventListener("mouseenter", () => {

    butterfly.classList.remove("fly");
    void butterfly.offsetWidth; // アニメーションをリセット
    butterfly.classList.add("fly");

  });

  conceptBtn.addEventListener("mouseleave", () => {

    butterfly.classList.remove("fly");

  });

}

// All Worksボタン 蝶々アニメーション
const worksBtn = document.querySelector(".works_allworks_btn .btn");
const processButterfly = document.querySelector(".butterfly");

if(worksBtn && processButterfly){

  worksBtn.addEventListener("mouseenter",()=>{
    processButterfly.classList.add("fly");
  });

  worksBtn.addEventListener("mouseleave",()=>{
    processButterfly.classList.remove("fly");
  });

}

//header
let lastScroll = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("hide");
    header.classList.remove("scrolled");
    lastScroll = currentScroll;
    return;
  }

  if (currentScroll > lastScroll) {
    // 下へスクロール → 隠す
    header.classList.add("hide");
    header.classList.remove("scrolled");
  } else {
    // 上へスクロール → 表示
    header.classList.remove("hide");
    header.classList.add("scrolled");
  }

  lastScroll = currentScroll;
});

//TOPに戻る
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();

    header.classList.remove("scrolled");
    header.classList.remove("hide");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


//Worksカテゴリ
if (document.querySelector(".pagination")) {
  const buttons = document.querySelectorAll(".works_filter_btn");
  const items = document.querySelectorAll(".item");
  const pagination = document.querySelector(".pagination");

  let currentCategory = "all";
  const itemsPerPage = 4; // 1ページに表示する作品数

  // 表示対象の作品を取得
  function getFilteredItems() {
    return [...items].filter(item => {
      return currentCategory === "all" || item.dataset.category === currentCategory;
    });
  }

  // ページネーション生成
  function createPagination(filteredItems, currentPage) {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;

      if (i === currentPage) {
        button.classList.add("active");
      }

      button.addEventListener("click", () => {
        showPage(i);

        document.querySelector(".works_container").scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });

      pagination.appendChild(button);
    }
  }

  // ページ表示（SP用）
  function showPage(page) {
    items.forEach(item => {
      item.style.display = "none";
    });

    const filteredItems = getFilteredItems();

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    filteredItems.slice(start, end).forEach(item => {
      item.style.display = "block";
    });

    createPagination(filteredItems, page);
  }

  // PC・SPで表示を切り替える
  function updateDisplay() {
    if (window.innerWidth <= 768) {
      showPage(1);
    } else {
      pagination.innerHTML = "";

      items.forEach(item => {
        item.style.display =
          currentCategory === "all" || item.dataset.category === currentCategory
            ? "block"
            : "none";
      });
    }
  }

  // カテゴリ切り替え
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;

      buttons.forEach(btn => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      updateDisplay();
    });
  });

  // 初期表示
  updateDisplay();

  // 画面サイズ変更時
  window.addEventListener("resize", updateDisplay);
}

//モーダルウィンドウ1(Works)
// 開く
document.querySelectorAll(".modal_open").forEach(button => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modal);

    modal.showModal();
    document.body.classList.add("modal-open");

    const body = modal.querySelector(".site_modal_body, .modal_body");
    if (body) {
      body.scrollTop = 0;
    }
  });
});

// 閉じる
document.querySelectorAll(".modal_close_btn").forEach(button => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// 共通
document.querySelectorAll("dialog").forEach(modal => {
  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });
});

//worksスライダー上
$(function () {
  if ($(".works_slider").length) {
    $('.works_slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      speed: 1000,
      cssEase: 'ease-in-out',
      arrows: false,
      dots: true
    });
  }
});

//worksスライダー下
$('.related_works_slider').slick({
  arrows: false,      // 矢印なし
  dots: false,        // ドットなし
  autoplay: true,     // 自動再生
  autoplaySpeed: 2500,   // 止まる時間
  speed: 600,        // 0.6秒で移動
  cssEase: 'ease', 
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  pauseOnHover: false,
  pauseOnFocus: false,
  

  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '100px'
      }
    }
  ]
});

//SP_ハンバーガーメニュー
const hamburger = document.querySelector(".hamburger");
const headerNav = document.querySelector(".header_nav");

if (hamburger && headerNav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    headerNav.classList.toggle("active");

    document.body.classList.toggle("menu-open");
  });
}


// 花びら
const petals = document.querySelector(".petals");

if (petals) {

  const imagePath = petals.dataset.imagePath;

  const images = [
    imagePath + "petal_1.svg",
    imagePath + "petal_2.svg",
    imagePath + "petal_3.svg"
  ];

  let lastImageIndex = -1;

  const petalCount = 7;
  for (let i = 0; i < petalCount; i++) {

    // 外側（落下用）
    const petal = document.createElement("div");
    petal.classList.add("petal");

    // 中（左右に揺れる用）
    const sway = document.createElement("div");
    sway.classList.add("petal_sway");

    // 花びら画像
    const img = document.createElement("img");

    // 前回と違う画像を選ぶ
    let imageIndex;
    do {
      imageIndex = Math.floor(Math.random() * images.length);
    } while (imageIndex === lastImageIndex);

    lastImageIndex = imageIndex;
    img.src = images[imageIndex];

  // 横位置（均等に散らす）
    const section = 100 / petalCount;
    const left = i * section + Math.random() * section;

    petal.style.left = `${left}vw`;

  // 大きさ（PC・SPで変更）
    const size =
      window.innerWidth <= 768
        ? 28 + Math.random() * 10   // SP
        : 45 + Math.random() * 20; // PC

    img.style.width = size + "px";

    // 最初の角度をランダム
    img.style.transform = `rotate(${Math.random() * 360}deg)`;

    // 落下速度
    petal.style.animationDuration = 8 + Math.random() * 6 + "s";

    // 左右の揺れ速度
    sway.style.animationDuration = 2 + Math.random() * 3 + "s";

    // 開始タイミング
    petal.style.animationDelay = -Math.random() * 8 + "s";

    // 入れ子
    sway.appendChild(img);
    petal.appendChild(sway);
    petals.appendChild(petal);
  }
}

//contactに入ったら花びらを消す
const works = document.querySelector("#works");
const contact = document.querySelector("#contact");

if (petals && contact) {
  function togglePetals() {
    const contactTop = contact.getBoundingClientRect().top;

    if (contactTop <= window.innerHeight) {
      petals.style.display = "none";
    } else {
      petals.style.display = "block";
    }
  }

  window.addEventListener("scroll", togglePetals);
  window.addEventListener("resize", togglePetals);
  togglePetals();
}