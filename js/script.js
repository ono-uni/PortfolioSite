/* ========================================
   Ono's Portfolio - script.js
   メニュー・スクロール表示・作品フィルター
======================================== */

// ページの読み込みが終わってから動かす
document.addEventListener("DOMContentLoaded", function () {

  // ----------------------------------------
  // 1. ハンバーガーメニュー（スマホ用）
  // ----------------------------------------
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      const isOpen = hamburger.classList.toggle("is-open");
      nav.classList.toggle("is-open");
      document.body.classList.toggle("is-menu-open", isOpen);

      // スクリーンリーダー向けに開閉状態を伝える
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      hamburger.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    });

    // メニュー内のリンクを押したら閉じる
    const navLinks = nav.querySelectorAll(".nav__link");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("is-open");
        nav.classList.remove("is-open");
        document.body.classList.remove("is-menu-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "メニューを開く");
      });
    });
  }


  // ----------------------------------------
  // 2. スクロールで要素をふわっと表示
  //    （.fade-in クラスがついた要素が対象）
  // ----------------------------------------
  const fadeItems = document.querySelectorAll(".fade-in");

  if (fadeItems.length > 0 && "IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // 画面に入ったら is-visible を付けてアニメーション開始
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // 一度表示したら監視をやめる（再アニメーション不要）
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        // 要素が少し見えたら発火（下側 15% 入ったら）
        threshold: 0.15,
      }
    );

    fadeItems.forEach(function (item) {
      fadeObserver.observe(item);
    });
  } else {
    // 古いブラウザではいきなり表示
    fadeItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }


  // ----------------------------------------
  // 3. Work ページ：作品カードをクリックしたら詳細ポップアップを表示
  // ----------------------------------------
  const workModal = document.getElementById("workModal");

  if (workModal) {
    const workItems = document.querySelectorAll(".works-item");
    const modalMedia = workModal.querySelector(".work-modal__media");
    const modalImg = workModal.querySelector(".work-modal__img");
    const modalTitle = workModal.querySelector(".work-modal__title");
    const modalCategory = workModal.querySelector(".work-modal__category");
    const modalUrlRow = workModal.querySelector(".work-modal__row--url");
    const modalUrl = workModal.querySelector(".work-modal__url");
    const modalService = workModal.querySelector(".work-modal__service");
    const modalDesc = workModal.querySelector(".work-modal__desc");
    const modalPurpose = workModal.querySelector(".work-modal__purpose");
    const modalTarget = workModal.querySelector(".work-modal__target");
    const modalPeriod = workModal.querySelector(".work-modal__period");
    const modalTools = workModal.querySelector(".work-modal__tools");

    let lastFocusedElement = null;

    function openWorkModal(item) {
      const img = item.querySelector("img");
      const title = item.querySelector(".works-item__title");
      const category = item.querySelector(".works-item__category");
      const url = item.getAttribute("data-url") || "";

      modalImg.src = img.getAttribute("src");
      modalImg.alt = img.getAttribute("alt") || "";
      modalTitle.textContent = title ? title.textContent.trim() : "";
      const categoryText = category ? category.textContent.trim() : "";
      modalCategory.textContent = categoryText;

      // Website の作品はキャプチャが縦長になりやすいので、縮小せずスクロールで見せる
      modalMedia.classList.toggle("work-modal__media--scroll", categoryText === "Website");

      if (url) {
        modalUrlRow.classList.remove("is-empty");
        modalUrl.href = url;
        modalUrl.textContent = url;
      } else {
        modalUrlRow.classList.add("is-empty");
        modalUrl.removeAttribute("href");
        modalUrl.textContent = "";
      }

      modalService.textContent = item.getAttribute("data-service") || "";
      modalDesc.textContent = item.getAttribute("data-desc") || "";
      modalPurpose.textContent = item.getAttribute("data-purpose") || "";
      modalTarget.textContent = item.getAttribute("data-target") || "";
      modalPeriod.textContent = item.getAttribute("data-period") || "";
      modalTools.textContent = item.getAttribute("data-tools") || "";

      lastFocusedElement = document.activeElement;
      workModal.classList.add("is-open");
      workModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-modal-open");
      workModal.querySelector(".work-modal__close").focus();
    }

    function closeWorkModal() {
      workModal.classList.remove("is-open");
      workModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-modal-open");
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }

    workItems.forEach(function (item) {
      const link = item.querySelector(".works-item__link");
      if (!link) return;

      link.addEventListener("click", function (e) {
        e.preventDefault();
        openWorkModal(item);
      });
    });

    workModal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", closeWorkModal);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && workModal.classList.contains("is-open")) {
        closeWorkModal();
      }
    });
  }


  // ----------------------------------------
  // 4. Like カード：動画セルをクリックしたらポップアップで再生
  // ----------------------------------------
  const likeVideoModal = document.getElementById("likeVideoModal");

  if (likeVideoModal) {
    const videoTriggers = document.querySelectorAll(".like__video-trigger");
    const modalVideo = likeVideoModal.querySelector(".media-modal__video");

    let lastFocusedLikeElement = null;

    function openLikeVideoModal(trigger) {
      modalVideo.src = trigger.getAttribute("data-video-src") || "";

      lastFocusedLikeElement = document.activeElement;
      likeVideoModal.classList.add("is-open");
      likeVideoModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-modal-open");
      likeVideoModal.querySelector(".media-modal__close").focus();
      modalVideo.play();
    }

    function closeLikeVideoModal() {
      likeVideoModal.classList.remove("is-open");
      likeVideoModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-modal-open");
      modalVideo.pause();
      modalVideo.removeAttribute("src");
      modalVideo.load();
      if (lastFocusedLikeElement) {
        lastFocusedLikeElement.focus();
      }
    }

    videoTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openLikeVideoModal(trigger);
      });
    });

    likeVideoModal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", closeLikeVideoModal);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && likeVideoModal.classList.contains("is-open")) {
        closeLikeVideoModal();
      }
    });
  }


  // ----------------------------------------
  // 5. ヘッダー：少しスクロールしたら背景を濃くする
  // ----------------------------------------
  // const header = document.querySelector(".header");

  // if (header) {
  //   window.addEventListener("scroll", function () {
  //     if (window.scrollY > 40) {
  //       header.style.background = "rgba(10, 10, 10, 0.92)";
  //     } else {
  //       header.style.background = "linear-gradient(to bottom, rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0))";
  //     }
  //   });
  // }

});
