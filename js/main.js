// スマホ幅のメニューを開け閉めする
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");

if (header && menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    // 読み上げソフトにも開閉の状態を伝える
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "閉じる" : "メニュー";
  });
}
