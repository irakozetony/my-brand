function createNavMenu() {
    let currentURL = window.location.href;
    const navMenu = document.querySelector(".nav_menu");
    const loggedIn = localStorage.getItem("loggedIn");

    if (
        (currentURL.includes("index") ||
            currentURL == "http://127.0.0.1:5501/" ||
            currentURL == "https://www.yvestony.com/" ||
            currentURL == "http://www.yvestony.com/") &&
        !loggedIn
    ) {
        navMenu.innerHTML = `
            <div class="mobile_menu_icon">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="menu_items">
                <li><a href="./about.html">About</a></li>
                <li><a href="./portfolio.html">Portfolio</a></li>
                <li><a href="./blogs.html">Blogs</a></li>
                <li><a href="./contact.html">Contact me</a></li>
                <li><a href="./login.html">Login</a></li>
            </ul>
        `;
    } else if (
        (currentURL.includes("index") ||
            currentURL == "http://127.0.0.1:5501/") &&
        loggedIn
    ) {
        navMenu.innerHTML = `
            <div class="mobile_menu_icon">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="menu_items">
                <li><a href="./about.html">About</a></li>
                <li><a href="./portfolio.html">Portfolio</a></li>
                <li><a href="./blogs.html">Blogs</a></li>
                <li><a href="./contact.html">Contact me</a></li>
                <li><a href="./dashboard.html">Dashboard</a></li>
            </ul>
        `;
    }
    if (
        (currentURL.includes("about") ||
            currentURL.includes("portfolio") ||
            currentURL.includes("blogs") ||
            currentURL.includes("contact") ||
            currentURL.includes("login") ||
            currentURL.includes("/article.html")) &&
        !loggedIn
    ) {
        navMenu.innerHTML = `
            <div class="mobile_menu_icon">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="menu_items">
                <li><a href="./about.html">About</a></li>
                <li><a href="./portfolio.html">Portfolio</a></li>
                <li><a href="./blogs.html">Blogs</a></li>
                <li><a href="./contact.html">Contact me</a></li>
                <li><a href="./login.html">Login</a></li>
            </ul>
        `;
    } else if (
        (currentURL.includes("about") ||
            currentURL.includes("portfolio") ||
            currentURL.includes("blogs") ||
            currentURL.includes("contact") ||
            currentURL.includes("/article.html")) &&
        loggedIn
    ) {
        navMenu.innerHTML = `
            <div class="mobile_menu_icon">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="menu_items">
                <li><a href="./about.html">About</a></li>
                <li><a href="./portfolio.html">Portfolio</a></li>
                <li><a href="./blogs.html">Blogs</a></li>
                <li><a href="./contact.html">Contact me</a></li>
                <li><a href="./dashboard.html">Dashboard</a></li>
            </ul>
        `;
    }
    if (
        currentURL.includes("dashboard") ||
        currentURL.includes("new_article") ||
        currentURL.includes("edit_article")
    ) {
        navMenu.innerHTML = `
            <div class="mobile_menu_icon">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="menu_items">
                <li><a href="./about.html">About</a></li>
                <li><a href="./portfolio.html">Portfolio</a></li>
                <li><a href="./blogs.html">Blogs</a></li>
                <li><a href="./contact.html">Contact me</a></li>
                <li><a href="./login.html" id="logout">Logout</a></li>
            </ul>
        `;
    }
}

createNavMenu();

const menu_icon = document.querySelector(".mobile_menu_icon");
const menu_items = document.querySelector(".menu_items");

menu_icon.addEventListener("click", () => {
    if (menu_items.classList.contains("active"))
        menu_items.classList.remove("active");
    else menu_items.classList.add("active");
});

const logoutButton = document.querySelector("#logout");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
    });
}
// for past experience tabs
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach((tabContent) =>
            tabContent.classList.remove("active")
        );
        tabs.forEach((tab) => tab.classList.remove("active"));
        tab.classList.add("active");
        target.classList.add("active");
    });
});

// for rich text editor
const editorButtons = document.querySelectorAll(".text_editor_button");
let show = false;
editorButtons.forEach((editorButton) => {
    editorButton.addEventListener("click", () => {
        let command = editorButton.dataset["cmd"];

        if (command == "createLink" || command == "insertImage") {
            let url = prompt("Enter url:", "https://");
            document.execCommand(command, false, url);
            if (command === "insertImage") {
                const images = document.querySelectorAll("img");
                images.forEach((image) => {
                    image.style.maxWidth = "500px";
                });
            }
        } else {
            document.execCommand(command, false, null);
        }
    });
});

// for subscribe email validation
const subscribeForm = document.querySelector("#subscribe_form");
const email = document.querySelector("#mail");

function validateEmail() {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.value.match(emailPattern)) {
        email.focus();
        return email.parentElement.classList.add("invalid");
    }
    email.parentElement.classList.remove("invalid");
    email.parentElement.classList.add("valid");
}
if (subscribeForm != null) {
    subscribeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validateEmail();

        email.addEventListener("keyup", validateEmail);
        if (!email.parentElement.classList.contains("invalid")) {
            location.href = subscribeForm.getAttribute("action");
        }
    });
}
// for contact page validation
const contactForm = document.querySelector("#contact_form");
const firstName = document.querySelector("#first_name");
const lastName = document.querySelector("#last_name");
const phone = document.querySelector("#phone");
const message = document.querySelector("#message");

function validateFirstName() {
    const namePattern = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;
    if (!firstName.value.match(namePattern)) {
        firstName.focus();
        return firstName.parentElement.classList.add("invalid");
    }
    firstName.parentElement.classList.remove("invalid");
    firstName.parentElement.classList.add("valid");
}

function validateLastName() {
    const namePattern = /^[A-Za-z][A-Za-z0-9_]{1,29}$/;
    if (!lastName.value.match(namePattern)) {
        lastName.focus();
        return lastName.parentElement.classList.add("invalid");
    }
    lastName.parentElement.classList.remove("invalid");
    lastName.parentElement.classList.add("valid");
}

function validatePhone() {
    const phonePattern =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phone.value !== "" && !phone.value.match(phonePattern)) {
        phone.focus();
        return phone.parentElement.classList.add("invalid");
    }
    phone.parentElement.classList.remove("invalid");
    phone.parentElement.classList.add("valid");
}

function validateMessage() {
    if (message.value === "") {
        message.focus();
        return message.classList.add("invalid");
    }
    message.classList.remove("invalid");
    message.classList.add("valid");
}

if (contactForm != null) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validateFirstName();
        validateEmail();
        validatePhone();
        validateMessage();
        validateLastName();
        firstName.addEventListener("keyup", validateFirstName);
        lastName.addEventListener("keyup", validateLastName);
        email.addEventListener("keyup", validateEmail);
        phone.addEventListener("keyup", validatePhone);
        message.addEventListener("keyup", validateMessage);

        if (
            !phone.parentElement.classList.contains("invalid") &&
            !email.parentElement.classList.contains("invalid") &&
            !firstName.parentElement.classList.contains("invalid") &&
            !message.classList.contains("invalid")
        ) {
            location.href = contactForm.getAttribute("action");
        }
    });
}

// validation for login page
const eyeIcon = document.querySelector("#show-hide");
if (eyeIcon != null) {
    eyeIcon.addEventListener("click", () => {
        const passwordInput = eyeIcon.parentElement.querySelector("input");
        if (passwordInput.type === "password") {
            eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
            return (passwordInput.type = "text");
        }
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        passwordInput.type = "password";
    });
}

const loginForm = document.querySelector("#login_form");
const userPassword = document.querySelector("#password");
const errorText = document.querySelector(".error_text");
function checkPassword() {
    let password = userPassword.value.trim();
    const lowerMatch = password.match(/[a-z]/g);
    const upperMatch = password.match(/[A-Z]/g);
    const digitMatch = password.match(/[0-9]/g);
    const specialMatch = password.match(/[^a-zA-Z0-9]/g);

    if (!lowerMatch) {
        userPassword.parentElement.querySelector(".error_text").innerText =
            "Password should contain at least one lower case letter";
        return userPassword.parentElement.classList.add("invalid");
    } else if (!upperMatch) {
        userPassword.parentElement.querySelector(".error_text").innerText =
            "Password should contain at least one upper case letter";
        return userPassword.parentElement.classList.add("invalid");
    } else if (!digitMatch) {
        userPassword.parentElement.querySelector(".error_text").innerText =
            "Password should contain at least one digit";
        return userPassword.parentElement.classList.add("invalid");
    } else if (!specialMatch) {
        userPassword.parentElement.querySelector(".error_text").innerText =
            "Password should contain at least special character";
        return userPassword.parentElement.classList.add("invalid");
    } else if (password.length < 8) {
        userPassword.parentElement.querySelector(".error_text").innerText =
            "Password should be more than 8 characters";
        return userPassword.parentElement.classList.add("invalid");
    } else {
        userPassword.parentElement.classList.remove("invalid");
        userPassword.parentElement.classList.add("valid");
    }
}
if (loginForm != null) {
    loginForm,
        addEventListener("submit", (e) => {
            e.preventDefault();

            validateEmail();
            checkPassword();
            email.addEventListener("keyup", validateEmail);
            userPassword.addEventListener("keyup", checkPassword);

            if (
                !email.parentElement.classList.contains("invalid") &&
                !userPassword.parentElement.classList.contains("invalid")
            ) {
                localStorage.setItem("loggedIn", "true");
                location.href = loginForm.getAttribute("action");
            }
        });
}

// article validation
const articleForm = document.querySelector("#article_form");

const articleTitle = document.querySelector("#article_title");
const articleContent = document.querySelector("#article_content");
// const articleCover = document.querySelector("#article_cover");
const fileButton = document.querySelector("#upload_primary");
const uploadIcon = document.querySelector(".upload_icon");
const secondaryFileButton = document.querySelector("#upload_secondary");
const fileName = document.querySelector("#upload_filename");
const image = document.querySelector(".preview_image img");
const wrapper = document.querySelector(".cover_wrapper");
const cancelButton = document.querySelector("#upload_cancel_button");
if (articleForm) {
    secondaryFileButton.addEventListener("click", clickFileButton);
    uploadIcon.addEventListener("click", clickFileButton);
    fileButton.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const result = reader.result;
                image.src = result;
                wrapper.classList.add("active");
            };
            cancelButton.addEventListener("click", function () {
                image.src = "";
                wrapper.classList.remove("active");
                fileButton.value = "";
                checkCover();
            });
            reader.readAsDataURL(file);
        }
        if (this.value) {
            let valueStore = extractFilename(this.value);
            fileName.textContent = valueStore;
        }
        checkCover();
    });
}

function clickFileButton(e) {
    e.preventDefault();
    fileButton.click();
}

function checkArticleTitle() {
    if (articleTitle.value == "") {
        articleTitle.parentElement.querySelector(".error_text").innerText =
            "Title can not be empty";
        return articleTitle.parentElement.classList.add("invalid");
    } else if (articleTitle.value.split(" ").length < 2) {
        articleTitle.parentElement.querySelector(".error_text").innerText =
            "Title is too short";
        return articleTitle.parentElement.classList.add("invalid");
    }
    articleTitle.parentElement.classList.remove("invalid");
    articleTitle.parentElement.classList.add("valid");
}
function checkArticleContent() {
    if (articleContent.innerHTML == "") {
        articleContent.parentElement.querySelector(".error_text").innerText =
            "Blog content can not be empty";
        return articleContent.parentElement.classList.add("invalid");
    } else if (articleContent.innerHTML.split(" ").length < 10) {
        articleContent.parentElement.querySelector(".error_text").innerText =
            "Blog content is too short";
        return articleContent.parentElement.classList.add("invalid");
    }
    articleContent.parentElement.classList.remove("invalid");
    articleContent.parentElement.classList.add("valid");
}
function checkCover() {
    if (fileButton.value == "") {
        fileButton.focus();
        return fileButton.parentElement.classList.add("invalid");
    }
    fileButton.parentElement.classList.remove("invalid");
}

function preloadArticleForm() {
    const articleId = getIdParam();
    if (!articleId) return;
    const article = getSingleArticle(articleId);
    articleTitle.value = article.articleTitle;
    articleContent.innerHTML = article.articleContent;
    image.src = article.articleCover;
}

function updateArticle() {
    const articleId = getIdParam();
    const articles = getArticles();
    articles.forEach((article) => {
        if (article.id == articleId) {
            article.articleTitle = articleTitle.value;
            article.articleContent = articleContent.innerHTML;
            if (fileButton.value != "") {
                article.articleCover = image.src;
            }
            article.articleSummary = articleContent.innerHTML.slice(0, 100);
        }
    });

    localStorage.setItem("articles", JSON.stringify(articles));
    location.href = articleForm.getAttribute("action");
}

if (articleForm != null) {
    preloadArticleForm();
    articleForm.addEventListener("submit", (e) => {
        const articleID = getIdParam();
        e.preventDefault();
        checkArticleTitle();
        checkArticleContent();

        if (!articleID) checkCover();
        articleTitle.addEventListener("keyup", checkArticleTitle);
        articleContent.addEventListener("keyup", checkArticleContent);

        if (
            !articleTitle.parentElement.classList.contains("invalid") &&
            !articleContent.parentElement.classList.contains("invalid") &&
            !fileButton.parentElement.classList.contains("invalid")
        ) {
            if (!articleID) {
                createArticle(
                    articleTitle.value,
                    articleContent.innerHTML,
                    image.src
                );
                location.href = articleForm.getAttribute("action");
            } else {
                updateArticle();
            }
        }
    });
}

function extractFilename(s) {
    return (typeof s === "string" && (s = s.match(/[^\\\/]+$/)) && s[0]) || "";
}
function getArticles() {
    let articles;
    if (localStorage.getItem("articles") == null) {
        articles = [];
    } else {
        articles = JSON.parse(localStorage.getItem("articles"));
    }
    return articles;
}

function createElement(
    elementName,
    className = null,
    attributeName = null,
    attributeValue = null,
    textContent = null
) {
    const newElement = document.createElement(elementName);
    if (className) {
        newElement.className = className;
    }
    if (attributeValue) {
        newElement.setAttribute(attributeName, attributeValue);
    }
    if (textContent) {
        newElement.innerHTML = textContent;
    }
    return newElement;
}

function createCommentAndLike(likesCount, commentsCount) {
    const ul = createElement("ul", "comment_and_like", null, null, null);
    const likesLi = createElement("li", null, null, null, null);
    const commentsLi = createElement("li", null, null, null, null);
    let likesCountSpan = createElement("span", "likes_count", null, null, null);
    let commentsCountSpan = createElement(
        "span",
        "comments_count",
        null,
        null,
        null
    );
    likesCountSpan.innerText = likesCount;
    commentsCountSpan.innerText = commentsCount;
    if (likesCount > 0) {
        const likes = createElement(
            "i",
            "fa-solid fa-heart",
            null,
            null,
            null,
            null
        );
        likesLi.appendChild(likes);
        likesLi.appendChild(likesCountSpan);
    } else {
        const likes = createElement(
            "i",
            "fa-regular fa-heart",
            null,
            null,
            null,
            null
        );
        likesLi.appendChild(likes);
        likesLi.appendChild(likesCountSpan);
    }

    const comments = createElement(
        "i",
        "fa-regular fa-comment",
        null,
        null,
        null,
        null
    );
    commentsLi.appendChild(comments);
    commentsLi.appendChild(commentsCountSpan);

    ul.appendChild(likesLi);
    ul.appendChild(commentsLi);
    return ul;
}

function showMainArticle() {
    // get the main article div
    const mainArticleDiv = document.querySelector(".main_article");
    const blogsMain = document.querySelector("#blogs_main");
    if (mainArticleDiv != null) {
        let articles = JSON.parse(localStorage.getItem("articles"));
        // get the most recent article to show case as the main article
        let recentArticle = articles.pop();
        // construct the thumbnail component
        if (!recentArticle) {
            const emptyText = createElement(
                "p",
                "no_blogs_found",
                null,
                null,
                "No blogs created yet"
            );
            blogsMain.insertBefore(emptyText, blogsMain.firstChild);
        } else {
            const mainThumb = createElement(
                "div",
                "main_article_thumbnail",
                null,
                null,
                null
            );
            const mainThumbImage = createElement(
                "img",
                null,
                "src",
                recentArticle.articleCover,
                null
            );
            mainThumb.appendChild(mainThumbImage);
            mainArticleDiv.appendChild(mainThumb);

            // get the main article show case div
            const mainArticleShowCase = createElement(
                "div",
                "main_article_showcase",
                null,
                null,
                null
            );

            // construct the showcase component
            const dateParagraph = createElement(
                "p",
                "article_date",
                null,
                null,
                recentArticle.dateAdded
            );
            mainArticleShowCase.appendChild(dateParagraph);

            const mainArticleTitle = createElement(
                "h3",
                "main_article_title",
                null,
                null,
                recentArticle.articleTitle
            );
            mainArticleShowCase.appendChild(mainArticleTitle);

            const mainArticleSummary = createElement(
                "p",
                "main_article_summary",
                null,
                null,
                recentArticle.articleSummary
            );
            mainArticleShowCase.appendChild(mainArticleSummary);

            const mainArticleLink = createElement(
                "a",
                "link_button",
                "href",
                `./article.html?id=${recentArticle.id}`,
                "Read"
            );
            mainArticleShowCase.appendChild(mainArticleLink);
            const mainArticleCommentsLikes = createCommentAndLike(
                recentArticle.likes,
                recentArticle.comments.length
            );
            mainArticleShowCase.appendChild(mainArticleCommentsLikes);

            mainArticleDiv.appendChild(mainArticleShowCase);
        }
    }
}
showMainArticle();
function showSmallArticles() {
    const secondaryArticles = document.querySelector(".secondary_articles");
    if (secondaryArticles != null) {
        let articles = JSON.parse(localStorage.getItem("articles"));
        articles = articles.slice(0, -1);
        articles.forEach((article) => {
            const smallArticle = createElement(
                "div",
                "small_article",
                null,
                null,
                null
            );

            const articleThumbnail = createElement(
                "div",
                "small_article_thumbnail",
                null,
                null,
                null
            );
            const articleThumbnailImg = createElement(
                "img",
                null,
                "src",
                article.articleCover,
                null
            );
            articleThumbnail.appendChild(articleThumbnailImg);

            const articleDateCommentLikes = createElement(
                "div",
                "date_comment_and_like",
                null,
                null,
                null
            );
            const articleDate = createElement(
                "p",
                "article_date",
                null,
                null,
                article.dateAdded
            );
            const articleCommentsAndLikes = createCommentAndLike(
                article.likes,
                article.comments.length
            );
            articleDateCommentLikes.appendChild(articleDate);
            articleDateCommentLikes.appendChild(articleCommentsAndLikes);

            const smallArticleShowCase = createElement(
                "div",
                "small_article_show_case",
                null,
                null,
                null
            );
            const titleAsLink = createElement(
                "a",
                "small_article_title",
                "href",
                `./article.html?id=${article.id}`,
                article.articleTitle
            );
            const articleSummary = createElement(
                "p",
                "small_article_summary",
                null,
                null,
                article.articleSummary
            );

            smallArticleShowCase.appendChild(titleAsLink);
            smallArticleShowCase.appendChild(articleSummary);

            smallArticle.appendChild(articleThumbnail);
            smallArticle.appendChild(articleDateCommentLikes);
            smallArticle.appendChild(smallArticleShowCase);

            secondaryArticles.appendChild(smallArticle);
        });
    }
}
showSmallArticles();
function showInTable() {
    let articles = JSON.parse(localStorage.getItem("articles"));
    let table = document.querySelector("table");
    let tableBody = document.querySelector("tbody");
    if (tableBody) {
        if (articles.length == 0) {
            const emptyText = createElement(
                "p",
                "no_blogs_found",
                null,
                null,
                "No blog entries found"
            );
            // emptyText.style.position = "relative";
            // emptyText.style.left= "50%";
            table.appendChild(emptyText);
        } else {
            articles.forEach((article) => {
                const articleRow = createElement("tr", null, null, null, null);
                const newsPaperColumn = createElement(
                    "td",
                    null,
                    null,
                    null,
                    null
                );
                const newsPaperIcon = createElement(
                    "i",
                    "fa-regular fa-newspaper",
                    null,
                    null,
                    null
                );
                newsPaperColumn.appendChild(newsPaperIcon);

                const titleColumn = createElement("td", null, null, null, null);
                titleColumn.innerText =
                    article.articleTitle.slice(0, 25) + "...";

                const dateColumn = createElement("td", null, null, null, null);
                dateColumn.innerText = article.dateAdded;

                const imageColumn = createElement("td", null, null, null, null);
                imageColumn.innerHTML = `<img src="${article.articleCover}" class="avatar">`;

                const commentsColumn = createElement(
                    "td",
                    null,
                    null,
                    null,
                    null
                );
                commentsColumn.innerText = article.comments.length;

                const likesColumn = createElement("td", null, null, null, null);
                likesColumn.innerText = article.likes;

                const editColumn = createElement("td", null, null, null, null);
                const editLink = document.createElement("a");
                editLink.setAttribute(
                    "href",
                    `./edit_article.html?id=${article.id}`
                );
                const editIcon = createElement(
                    "i",
                    "fa-regular fa-pen-to-square",
                    null,
                    null,
                    null
                );
                editLink.appendChild(editIcon);
                editColumn.appendChild(editLink);

                const deleteColumn = createElement(
                    "td",
                    null,
                    null,
                    null,
                    null
                );
                const deleteIcon = createElement(
                    "i",
                    "fa-solid fa-trash-can",
                    "onclick",
                    `deleteArticle(${article.id})`,
                    null
                );
                deleteColumn.appendChild(deleteIcon);

                articleRow.appendChild(newsPaperColumn);
                articleRow.appendChild(titleColumn);
                articleRow.appendChild(dateColumn);
                articleRow.appendChild(imageColumn);
                articleRow.appendChild(commentsColumn);
                articleRow.appendChild(likesColumn);
                articleRow.appendChild(editColumn);
                articleRow.appendChild(deleteColumn);

                tableBody.appendChild(articleRow);
            });
            tableBody.addEventListener("click", removeArticleRow);
        }
    }
}

showInTable();

function removeArticleRow(e) {
    if (e.target.classList.contains("fa-trash-can")) {
        let td = e.target.parentElement;
        let tr = td.parentElement;
        tr.remove();
    }
}
function deleteFromLocalStorage(articleId) {
    const articles = getArticles();

    articles.forEach((article, index) => {
        if (article.id == articleId) {
            articles.splice(index, 1);
        }
    });
    localStorage.setItem("articles", JSON.stringify(articles));
}

function deleteArticle(id) {
    deleteFromLocalStorage(id);
    location.href = "./dashboard.html";
}

function getSingleArticle(id) {
    const articles = getArticles();
    let retArticle = null;
    articles.forEach((article) => {
        if (article.id == id) {
            retArticle = article;
        }
    });
    return retArticle;
}

function createArticle(title, content, coverPhoto) {
    let articles = getArticles();
    let article = {
        id: articles.length + 1,
        articleTitle: title,
        articleContent: content,
        articleCover: coverPhoto,
        articleSummary: content.slice(0, 30),
        likes: 0,
        comments: [],
        dateAdded: new Date().toLocaleDateString("en-US"),
    };
    articles.push(article);
    localStorage.setItem("articles", JSON.stringify(articles));
}
const summaryContent = document.querySelectorAll(".summary_content");

function countTotalComments() {
    let total = 0;
    const articles = getArticles();

    articles.forEach((article) => {
        total += article.comments.length;
    });
    return total;
}
function countTotalLikes() {
    let total = 0;
    const articles = getArticles();

    articles.forEach((article) => {
        total += article.likes;
    });

    return total;
}
function createSummaryContent() {
    if (summaryContent) {
        for (let i = 0; i < summaryContent.length - 1; i++) {
            if (i == 0) {
                summaryContent[i].innerHTML = getArticles().length;
            }
            if (i == 1) {
                summaryContent[i].innerHTML = countTotalComments();
            }
            if (i == 2) {
                summaryContent[i].innerHTML = countTotalLikes();
            }
        }
    }
}

createSummaryContent();
function getIdParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const articleId = urlParams.get("id");
    return articleId;
}
function showSingleArticle() {
    const articleWrapper = document.querySelector(".article_wrapper");
    if (articleWrapper) {
        const articleId = getIdParam();
        const currentArticle = getSingleArticle(articleId);

        const mainThumb = createElement(
            "div",
            "main_article_thumbnail",
            null,
            null,
            null
        );
        const mainThumbImage = createElement(
            "img",
            null,
            "src",
            currentArticle.articleCover
        );
        mainThumb.appendChild(mainThumbImage);
        articleWrapper.appendChild(mainThumb);

        const mainArticleTitle = createElement(
            "p",
            "article_title",
            null,
            null,
            currentArticle.articleTitle
        );
        articleWrapper.appendChild(mainArticleTitle);

        const mainArticleDate = createElement(
            "div",
            "published_date",
            null,
            null,
            currentArticle.dateAdded
        );
        articleWrapper.appendChild(mainArticleDate);

        const mainArticleContent = createElement(
            "div",
            "article_content",
            null,
            null,
            currentArticle.articleContent
        );
        articleWrapper.appendChild(mainArticleContent);

        const mainArticleCommentsLikes = createCommentAndLike(
            currentArticle.likes,
            currentArticle.comments.length
        );
        articleWrapper.appendChild(mainArticleCommentsLikes);

        const divider = createElement(
            "hr",
            "content_divider",
            null,
            null,
            null
        );
        articleWrapper.appendChild(divider);

        const commentForm = document.createElement("form");
        commentForm.setAttribute("action", `./article.html?id=${articleId}`);
        commentForm.innerHTML = `
            <label for="comment">Your comment</label>
            <textarea
                name="comment"
                id="comment"
                placeholder="Leave your comment here"
            ></textarea>
            <span class="error">
                <i
                    class="fa-solid fa-circle-exclamation error-icon"
                ></i>
                <p class="error_text">Please enter something</p>
            </span>
            <div class="subscribe_input">
                <label for="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Irakoze Yves"
                />
                <span class="error">
                    <i
                        class="fa-solid fa-circle-exclamation error-icon"
                    ></i>
                    <p class="error_text">
                        Please enter a valid name
                    </p>
                </span>
            </div>
            <input type="submit" value="Post comment" id="post_comment"/>
        `;
        commentForm.setAttribute("id", "comment_form");
        articleWrapper.appendChild(commentForm);

        const commentsSection = createElement(
            "div",
            "comments_section",
            null,
            null,
            null
        );
        const articleComments = currentArticle.comments;
        if (articleComments) {
            articleComments.forEach((comment) => {
                const singleComment = createElement(
                    "div",
                    "single_comment",
                    null,
                    null,
                    null
                );
                const userIcon = createElement(
                    "i",
                    "fa-regular fa-circle-user"
                );
                singleComment.appendChild(userIcon);
                const commentSection = createElement(
                    "div",
                    "comment",
                    null,
                    null,
                    null
                );

                const commentAuthor = createElement(
                    "p",
                    "user_name",
                    null,
                    null,
                    comment.author
                );
                commentSection.append(commentAuthor);
                const commentContent = createElement(
                    "p",
                    "comment_text",
                    null,
                    null,
                    comment.content
                );
                commentSection.append(commentContent);
                singleComment.appendChild(commentSection);
                commentsSection.appendChild(singleComment);
            });
        }
        articleWrapper.appendChild(commentsSection);
    }
}
showSingleArticle();

// for commnet & name validation
const commentForm = document.querySelector("#comment_form");
const comment = document.querySelector("#comment");
const commentUser = document.querySelector("#name");

function validateComment() {
    if (comment.value === "") {
        comment.focus();
        return comment.classList.add("invalid");
    }
    comment.classList.remove("invalid");
    comment.classList.add("valid");
}

function validateName() {
    const namePattern = /^[A-Za-z][A-Za-z0-9_]{2,29}$/;
    if (!commentUser.value.match(namePattern)) {
        commentUser.focus();
        return commentUser.parentElement.classList.add("invalid");
    }
    commentUser.parentElement.classList.remove("invalid");
    commentUser.parentElement.classList.add("valid");
}
if (commentForm != null) {
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validateComment();
        validateName();
        comment.addEventListener("keyup", validateComment);
        commentUser.addEventListener("keyup", validateName);

        if (
            !commentUser.parentElement.classList.contains("invalid") &&
            !comment.classList.contains("invalid")
        ) {
            addComment(commentUser.value, comment.value);
            location.href = commentForm.getAttribute("action");
        }
    });
}

function addComment(commentUser, comment) {
    const articleId = getIdParam();
    const articles = getArticles();

    const newComment = {
        author: commentUser,
        content: comment,
    };

    articles.forEach((article) => {
        if (articleId == article.id) {
            article.comments.push(newComment);
        }
    });
    localStorage.setItem("articles", JSON.stringify(articles));
}

const mainArticleWrapper = document.querySelector(".article_wrapper");
if (mainArticleWrapper) {
    if (mainArticleWrapper.children.length > 0) {
        const likeButton = document.querySelector(".fa-heart");
        likeButton.addEventListener("click", addLike);
    }
}

function addLike() {
    const articleId = getIdParam();
    const articles = getArticles();
    let newCount;
    articles.forEach((article) => {
        if (article.id == articleId) {
            if (article.likes > 0) {
                article.likes--;
                newCount = article.likes;
            } else {
                article.likes++;
                newCount = article.likes;
            }
        }
    });

    localStorage.setItem("articles", JSON.stringify(articles));
    updateLikes(newCount);
}

function updateLikes(newLikesCount) {
    const likesCount = document.querySelector(".likes_count");
    likesCount.innerText = newLikesCount;
}

function showAsideArticles() {
    const secondaryArticles = document.querySelector(".aside_wrapper");
    const articleId = getIdParam();
    if (secondaryArticles != null) {
        let articles = JSON.parse(localStorage.getItem("articles"));
        articles.forEach((article) => {
            if (article.id == articleId) {
                return;
            }
            const smallArticle = createElement(
                "div",
                "small_article",
                null,
                null,
                null
            );

            const articleThumbnail = createElement(
                "div",
                "small_article_thumbnail",
                null,
                null,
                null
            );
            const articleThumbnailImg = createElement(
                "img",
                null,
                "src",
                article.articleCover,
                null
            );
            articleThumbnail.appendChild(articleThumbnailImg);

            const articleDateCommentLikes = createElement(
                "div",
                "date_comment_and_like",
                null,
                null,
                null
            );
            const articleDate = createElement(
                "p",
                "article_date",
                null,
                null,
                article.dateAdded
            );
            const articleCommentsAndLikes = createCommentAndLike(
                article.likes,
                article.comments.length
            );
            articleDateCommentLikes.appendChild(articleDate);
            articleDateCommentLikes.appendChild(articleCommentsAndLikes);

            const smallArticleShowCase = createElement(
                "div",
                "small_article_show_case",
                null,
                null,
                null
            );
            const titleAsLink = createElement(
                "a",
                "small_article_title",
                "href",
                `./article.html?id=${article.id}`,
                article.articleTitle
            );
            const articleSummary = createElement(
                "p",
                "small_article_summary",
                null,
                null,
                article.articleSummary
            );

            smallArticleShowCase.appendChild(titleAsLink);
            smallArticleShowCase.appendChild(articleSummary);

            smallArticle.appendChild(articleThumbnail);
            smallArticle.appendChild(articleDateCommentLikes);
            smallArticle.appendChild(smallArticleShowCase);

            secondaryArticles.appendChild(smallArticle);
        });
    }
}
showAsideArticles();
