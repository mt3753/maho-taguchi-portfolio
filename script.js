console.log("読み込まれました");

//Worksカテゴリ
const buttons = document.querySelectorAll(".works_filter_btn");
const items = document.querySelectorAll(".item");

//カテゴリ分け
buttons.forEach(button => {
  button.addEventListener("click", () => {

    const category = button.dataset.category;

    items.forEach(item => {

      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }

    });

  });
});

//クリックしたときの色変更/Worksカテゴリ
buttons.forEach(button => {
  button.addEventListener("click", () => {

    buttons.forEach(btn => {
      btn.classList.remove("is-active");
    });

    button.classList.add("is-active");

  });
});

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

//worksスライダー
$(function () {
  $('.works_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true
  });
});