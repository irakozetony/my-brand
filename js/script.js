const loggedOutNav = `
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
const loggedInNav = `
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
const logoutNav = `
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
function createNavMenu() {
    let currentURL = window.location.href;
    const navMenu = document.querySelector(".nav_menu");
    const loggedIn = localStorage.getItem("loggedIn");

    if (
        (currentURL.includes("index") ||
            currentURL == "http://127.0.0.1:5500/" ||
            currentURL == "https://www.yvestony.com/" ||
            currentURL == "http://www.yvestony.com/") &&
        !loggedIn
    ) {
        navMenu.innerHTML = loggedOutNav;
    } else if (
        (currentURL.includes("index") ||
            currentURL == "http://127.0.0.1:5500/") &&
        loggedIn
    ) {
        navMenu.innerHTML = loggedInNav;
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
        navMenu.innerHTML = loggedOutNav;
    } else if (
        (currentURL.includes("about") ||
            currentURL.includes("portfolio") ||
            currentURL.includes("blogs") ||
            currentURL.includes("contact") ||
            currentURL.includes("/article.html")) &&
        loggedIn
    ) {
        navMenu.innerHTML = loggedInNav;
    }
    if (
        currentURL.includes("dashboard") ||
        currentURL.includes("new_article") ||
        currentURL.includes("edit_article")
    ) {
        navMenu.innerHTML = logoutNav;
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
        localStorage.removeItem("token");
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
    contactForm.addEventListener("submit", async (e) => {
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
            const clientMessage = {
                first_name: firstName.value,
                last_name: lastName.value,
                mail: email.value,
                phone: phone.value,
                message: message.value,
            };
            const response = await postContactMessage(clientMessage);
            if (response.message) {
                alert(
                    "Message received. I'll reply as soon as I can. Thank you."
                );
                location.reload();
            } else {
                alert("Message not sent. Try again.");
                location.reload();
            }
        }
    });
}

async function postContactMessage(message) {
    try {
        const response = await fetch(apiURL + "messages", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(message),
        });
        const result = response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
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
async function postLogin(user) {
    try {
        const response = await fetch(apiURL + "auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(user),
        });

        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}
if (loginForm != null) {
    loginForm,
        addEventListener("submit", async (e) => {
            e.preventDefault();

            validateEmail();
            checkPassword();
            email.addEventListener("keyup", validateEmail);
            userPassword.addEventListener("keyup", checkPassword);

            if (
                !email.parentElement.classList.contains("invalid") &&
                !userPassword.parentElement.classList.contains("invalid")
            ) {
                const user = {
                    email: email.value,
                    password: userPassword.value.trim(),
                };

                const response = await postLogin(user);
                if (response.user_token) {
                    localStorage.setItem("loggedIn", "true");
                    const token = `Bearer ${response.user_token}`;
                    localStorage.setItem("token", token);
                    window.location = loginForm.getAttribute("action");
                } else {
                    alert("User not found!");
                }
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
    } else if (articleTitle.value.length < 2) {
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
    } else if (articleContent.innerHTML.length < 10) {
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

const apiURL = "https://yves-brand-backend.up.railway.app/api/v1/";
// const apiURL = "http://localhost:5000/api/v1/";

async function getBlogs() {
    try {
        const response = await fetch(apiURL + "blogs");
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
async function getBlog(id) {
    try {
        const response = await fetch(`${apiURL}blogs/${id}`);
        const data = await response.json();
        const blog = data.blog;
        return blog;
    } catch (err) {
        console.log(err);
    }
}

async function getComments(id) {
    try {
        const response = await fetch(`${apiURL}blogs/${id}/comments`);
        const data = await response.json();
        const comments = data.comments;
        return comments;
    } catch (err) {
        console.log(err);
    }
}
async function preloadArticleForm() {
    const articleId = getIdParam();
    if (!articleId) return;
    const article = await getBlog(articleId);
    articleTitle.value = article.title;
    articleContent.innerHTML = JSON.parse(article.content);
    // const imgUrl = await fetch(article.img);
    // const blob = await imgUrl.blob();
    // const reader = new FileReader();
    // reader.onload = function (){
    //     const result = reader.result
    //     console.log(fileButton.files[0]);
    //     fileButton.files.push(result);
    //     console.log(fileButton.files[0]);
    // }
    // reader.readAsDataURL(blob);
    image.src = article.img;
}
if (articleForm != null) {
    preloadArticleForm();
    articleForm.addEventListener("submit", async (e) => {
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
                let data = new FormData();
                data.append("title", articleTitle.value);
                data.append(
                    "content",
                    JSON.stringify(articleContent.innerHTML)
                );
                data.append("img", fileButton.files[0]);
                const authToken = localStorage.getItem("token");
                toast.classList = "toast show";
                loadingIcon.classList = "icon_loading active";
                loadingMessage.classList = "message_loading active";
                const response = await fetch(apiURL + "blogs", {
                    headers: {
                        Authorization: authToken,
                    },
                    method: "POST",
                    body: data,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        return data;
                    })
                    .catch((err) => console.log(err));

                if (!response.error) {
                    toast.classList = "toast show";
                    loadingIcon.classList = "icon_loading";
                    loadingMessage.classList = "message_loading";
                    successIcon.classList = "icon_success active";
                    successMessage.classList = "message_success active";
                    setTimeout(() => {
                        toast.classList = "toast";
                        successIcon.classList = "icon_success";
                        successMessage.classList = "message_success";
                    }, 3000);
                    location.href = articleForm.getAttribute("action");
                } else {
                    toast.classList = "toast show";
                    loadingIcon.classList = "icon_loading";
                    loadingMessage.classList = "message_loading";
                    errorIcon.classList = "icon_error active";
                    errorMessage.classList = "message_error active";
                    setTimeout(() => {
                        toast.classList = "toast";
                        errorIcon.classList = "icon_error";
                        errorMessage.innerHTML = response.error;
                        errorMessage.classList = "message_error";
                    }, 3000);
                    return;
                }
            } else {
                const id = getIdParam();
                let data = new FormData();
                data.append("title", articleTitle.value);
                data.append(
                    "content",
                    JSON.stringify(articleContent.textContent)
                );
                data.append("img", fileButton.files[0]);
                const authToken = localStorage.getItem("token");
                toast.classList = "toast show";
                loadingIcon.classList = "icon_loading active";
                loadingMessage.classList = "message_loading active";
                const response = await fetch(apiURL + `blogs/${id}`, {
                    headers: {
                        Authorization: authToken,
                    },
                    method: "PATCH",
                    body: data,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        return data;
                    })
                    .catch((err) => console.log(err));

                if (!response.error) {
                    toast.classList = "toast show";
                    loadingIcon.classList = "icon_loading";
                    loadingMessage.classList = "message_loading";
                    successIcon.classList = "icon_success active";
                    successMessage.classList = "message_success active";
                    setTimeout(() => {
                        toast.classList = "toast";
                        successIcon.classList = "icon_success";
                        successMessage.classList = "message_success";
                    }, 3000);
                    location.href = articleForm.getAttribute("action");
                } else {
                    toast.classList = "toast show";
                    loadingIcon.classList = "icon_loading";
                    loadingMessage.classList = "message_loading";
                    errorIcon.classList = "icon_error active";
                    errorMessage.classList = "message_error active";
                    setTimeout(() => {
                        toast.classList = "toast";
                        errorIcon.classList = "icon_error";
                        errorMessage.innerHTML = response.error;
                        errorMessage.classList = "message_error";
                    }, 3000);
                    return;
                }
            }
        }
    });
}

function extractFilename(s) {
    return (typeof s === "string" && (s = s.match(/[^\\\/]+$/)) && s[0]) || "";
}

async function showMainArticle() {
    const mainArticleDiv = document.querySelector(".main_article");
    const blogsMain = document.querySelector("#blogs_main");
    if (mainArticleDiv != null) {
        const blogs = await getBlogs();
        const articles = blogs.blog_list;

        const recentArticle = articles.pop();
        if (!recentArticle) {
            const emptyTextParagraph = document.createElement("p");
            emptyTextParagraph.classList = "no_blogs_found";
            emptyTextParagraph.innerText = "No blogs created yet";
            mainArticleDiv.innerHTML = "";
            blogsMain.insertBefore(emptyTextParagraph, blogsMain.firstChild);
        } else {
            const likesCount = recentArticle.likes;
            const commentsCount = recentArticle.comments.length;
            let likesIconClass = "fa-regular fa-heart";
            if (likesCount > 0) likesIconClass = "fa-solid fa-heart";
            const mainThumb = document.createElement("div");
            mainThumb.classList = "main_article_thumbnail";
            mainThumb.innerHTML = `
            <img src="${recentArticle.img}">`;
            const mainArticleShowCase = document.createElement("div");
            mainArticleShowCase.classList = "main_article_showcase";
            mainArticleShowCase.innerHTML = `
            <p class="article_date">${recentArticle.createdAt.substring(
                0,
                10
            )}</p>
            <h3 class="main_article_title">${recentArticle.title}</h3>
            <p class="main_article_summary">${recentArticle.content.substring(
                0,
                100
            )}</p>
            <a class="link_button" href="./article.html?id=${
                recentArticle._id
            }">Read</a>
            <ul class="comment_and_like">
                <li>
                    <i class="${likesIconClass}"></i>
                    <span class="likes_count">${likesCount}</span>
                </li>
                <li>
                    <i class="fa-regular fa-comment"></i>
                    <span class="comments_count">${commentsCount}</span>
                </li>
            </ul>
            `;
            mainArticleDiv.innerHTML = "";
            mainArticleDiv.appendChild(mainThumb);
            mainArticleDiv.appendChild(mainArticleShowCase);
        }
    }
}
showMainArticle();

async function showSmallArticles() {
    const secondaryArticles = document.querySelector(".secondary_articles");
    if (secondaryArticles != null) {
        const blogs = await getBlogs();
        let articles = blogs.blog_list;
        articles = articles.slice(0, -1);
        secondaryArticles.innerHTML = "";
        if (articles.length != 0) {
            secondaryArticles.innerHTML = "";
            articles.forEach((article) => {
                const likesCount = article.likes;
                const commentsCount = article.comments.length;
                let likesIconClass = "fa-regular fa-heart";
                if (likesCount > 0) likesIconClass = "fa-solid fa-heart";
                const smallArticle = document.createElement("div");
                smallArticle.classList = "small_article";
                smallArticle.innerHTML = `
            <div class="small_article_thumbnail">
                <img src="${article.img}">
                <div class="date_comment_and_like">
                    <p class="article_date">
                        ${article.createdAt.substring(0, 10)}
                    </p>
                    <ul class="comment_and_like">
                        <li>
                            <i class="${likesIconClass}"></i>
                            <span class="likes_count">${likesCount}</span>
                        </li>
                        <li>
                            <i class="fa-regular fa-comment"></i>
                            <span class="comments_count">${commentsCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="small_article_show_case">
                <a class="small_article_title" href="./article.html?id=${
                    article._id
                }">${article.title}</a>
                <p class="small_article_summary">${article.content.substring(
                    0,
                    20
                )}</p>
            </div>
            `;
                secondaryArticles.appendChild(smallArticle);
            });
        }
    }
}
showSmallArticles();

async function showInTable() {
    const blogs = await getBlogs();
    const articles = blogs.blog_list;
    let table = document.querySelector("#dashboard_table");
    let tableBody = document.querySelector("#dashboard_table tbody");
    if (tableBody) {
        if (articles.length == 0) {
            tableBody.innerHTML = "";
            const emptyTextParagraph = document.createElement("p");
            emptyTextParagraph.classList = "no_blogs_found";
            emptyTextParagraph.innerText = "No blog entries found";
        } else {
            tableBody.innerHTML = "";
            articles.forEach((article) => {
                const articleRow = document.createElement("tr");
                articleRow.innerHTML = `
                <td>
                    <i class="fa-regular fa-newspaper"></i>
                </td>
                <td>${article.title.slice(0, 25)}...</td>
                <td>${article.createdAt.substring(0, 10)}</td>
                <td>
                    <img src="${article.img}" class="avatar">
                </td>
                <td>${article.comments.length}</td>
                <td>${article.likes}</td>
                <td>
                    <a href="./edit_article.html?id=${article._id}">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </a>
                </td>
                <td>
                    <i class="fa-solid fa-trash-can" onclick="deleteArticle('${
                        article._id
                    }')"></i>
                </td>
                `;
                tableBody.appendChild(articleRow);
            });
        }
    }
}

showInTable();

const toast = document.querySelector(".toast");
const successIcon = document.querySelector(".icon_success");
const successMessage = document.querySelector(".message_success");
const errorIcon = document.querySelector(".icon_error");
const errorMessage = document.querySelector(".message_error");
const loadingIcon = document.querySelector(".icon_loading");
const loadingMessage = document.querySelector(".message_loading");

async function deleteArticle(id) {
    const authToken = localStorage.getItem("token");
    try {
        const response = await fetch(apiURL + `blogs/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authToken,
            },
        });
        const result = await response.json();
        if (result.error) {
            toast.classList = "toast show";
            errorIcon.classList = "icon_error active";
            errorMessage.classList = "message_error active";
            setTimeout(() => {
                toast.classList = "toast";
                errorIcon.classList = "icon_error";
                errorMessage.innerHTML = result.error;
                errorMessage.classList = "message_error";
            }, 3000);
            return;
        }
        toast.classList = "toast show";
        successIcon.classList = "icon_success active";
        successMessage.classList = "message_success active";
        setTimeout(() => {
            toast.classList = "toast";
            successIcon.classList = "icon_success";
            successMessage.classList = "message_success";
        }, 3000);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}
function getIdParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const articleId = urlParams.get("id");
    return articleId;
}

async function showSingleArticle() {
    const articleWrapper = document.querySelector(".article_wrapper");
    if (articleWrapper) {
        const articleId = getIdParam();
        const currentArticle = await getBlog(articleId);
        const likesCount = currentArticle.likes;
        const commentsCount = currentArticle.comments.length;
        let likesIconClass = "fa-regular fa-heart";
        if (likesCount > 0) likesIconClass = "fa-solid fa-heart";
        articleWrapper.innerHTML = `
        <div class="main_article_thumbnail">
            <img src="${currentArticle.img}">
        </div>
            <p class="article_title">${currentArticle.title}</p>
            <div class="published_date">${currentArticle.createdAt.substring(
                0,
                10
            )}</div>
            <div class="article_content">${JSON.parse(
                currentArticle.content
            )}</div>
            <ul class="comment_and_like">
                <li>
                    <i class="${likesIconClass}"></i>
                    <span class="likes_count">${likesCount}</span>
                </li>
                <li>
                    <i class="fa-regular fa-comment"></i>
                    <span class="comments_count">${commentsCount}</span>
                </li>
            </ul>
            <hr class="contet_divider">
        </div>
        `;
        const commentFormSection = document.createElement("form");
        commentFormSection.classList = "comment_form";
        commentFormSection.innerHTML = `
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
        articleWrapper.appendChild(commentFormSection);
        const commentsSection = document.createElement("div");
        commentsSection.classList = "comments_section";
        const articleComments = await getComments(articleId);

        if (articleComments) {
            articleComments.forEach((comment) => {
                const singleComment = document.createElement("div");
                singleComment.classList = "single_comment";
                singleComment.innerHTML = `
                <i class="fa-regular fa-circle-user"></i>
                <div class="comment">
                    <p class="user_name">${comment.author}</p>
                    <p class="comment_text">${comment.message}</p>
                </div>
                `;
                commentsSection.appendChild(singleComment);
            });
        }
        articleWrapper.appendChild(commentsSection);

        const commentForm = document.querySelector(".comment_form");
        const comment = document.querySelector("#comment");
        const commentUser = document.querySelector("#name");

        if (commentForm != null) {
            commentForm.addEventListener("submit", (e) => {
                e.preventDefault();
                validateComment(comment);
                validateName(commentUser);
                comment.addEventListener("keypress", () =>
                    validateComment(comment)
                );
                commentUser.addEventListener("keyup", () =>
                    validateName(commentUser)
                );

                if (
                    !commentUser.parentElement.classList.contains("invalid") &&
                    !comment.classList.contains("invalid")
                ) {
                    addComment(commentUser.value, comment.value);
                }
            });
        }

        const likeButton = document.querySelector(".fa-heart");
        likeButton.addEventListener("click", addLike);
    }
}
async function addLike() {
    const articleId = getIdParam();
    const currentArticle = await getBlog(articleId);
    const likedArticles = getLikedArticles();
    if (currentArticle) {
        if (!likedArticles.includes(articleId)) {
            const response = await postLike(articleId);
            const newLikesCount = response.likes;
            const likesCount = document.querySelector(".likes_count");
            likesCount.innerText = newLikesCount;
            likedArticles.push(articleId);
            localStorage.setItem(
                "likedArticles",
                JSON.stringify(likedArticles)
            );
        } else {
            const response = await postUnlike(articleId);
            const newLikesCount = response.likes;
            const likesCount = document.querySelector(".likes_count");
            likesCount.innerText = newLikesCount;
            removeFromLikedArticles(articleId);
        }
    }
}
async function postUnlike(id) {
    try {
        const response = await fetch(apiURL + `blogs/${id}/unlike`, {
            method: "POST",
        });
        const result = response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

function getLikedArticles() {
    let likedArticles;
    if (localStorage.getItem("likedArticles") == null) {
        likedArticles = [];
    } else {
        likedArticles = JSON.parse(localStorage.getItem("likedArticles"));
    }
    return likedArticles;
}

function removeFromLikedArticles(id) {
    const likedArticles = getLikedArticles();
    likedArticles.forEach((article, index) => {
        if (article == id) likedArticles.splice(index, 1);
    });
    localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
}

async function postLike(id) {
    try {
        const response = await fetch(apiURL + `blogs/${id}/like`, {
            method: "POST",
        });
        const result = response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}
async function addComment(commentUser, comment) {
    const articleId = getIdParam();
    const currentArticle = await getBlog(articleId);
    const newComment = {
        author: commentUser,
        message: comment,
    };
    if (currentArticle) {
        const response = await postComment(articleId, newComment);
        if (!response.error) {
            location.reload();
        } else {
            alert("Comment not added");
        }
    }
}

async function postComment(id, newComment) {
    console.log("Called post comment");
    try {
        const response = await fetch(apiURL + `blogs/${id}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(newComment),
        });

        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
}
function validateComment(comment) {
    if (comment.value === "") {
        comment.focus();
        return comment.classList.add("invalid");
    }
    comment.classList.remove("invalid");
    comment.classList.add("valid");
}
function validateName(commentUser) {
    const namePattern = /[a-zA-Z0-9._]{2,}/;
    if (!commentUser.value.match(namePattern)) {
        commentUser.focus();
        return commentUser.parentElement.classList.add("invalid");
    }
    commentUser.parentElement.classList.remove("invalid");
    commentUser.parentElement.classList.add("valid");
}

async function getMessages() {
    const authToken = localStorage.getItem("token");
    try {
        const response = await fetch(apiURL + "messages", {
            headers: {
                Authorization: authToken,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function countTotalMessages() {
    const data = await getMessages();
    const messages = data.messages;
    return messages.length;
}

async function countTotalComments() {
    let total = 0;
    const blogs = await getBlogs();
    const articles = blogs.blog_list;

    articles.forEach((article) => {
        total += article.comments.length;
    });
    return total;
}
async function countTotalLikes() {
    let total = 0;
    const blogs = await getBlogs();
    const articles = blogs.blog_list;

    articles.forEach((article) => {
        total += article.likes;
    });

    return total;
}

const summaryContent = document.querySelectorAll(".summary_content");

async function createSummaryContent() {
    const blogs = await getBlogs();
    const blogsCount = blogs.blog_list.length;
    if (summaryContent) {
        for (let i = 0; i < summaryContent.length; i++) {
            if (i == 0) {
                summaryContent[i].classList.remove("skeleton", "skeleton_text");
                summaryContent[i].innerHTML = blogsCount;
            }
            if (i == 1) {
                summaryContent[i].classList.remove("skeleton", "skeleton_text");
                summaryContent[i].innerHTML = await countTotalComments();
            }
            if (i == 2) {
                summaryContent[i].classList.remove("skeleton", "skeleton_text");
                summaryContent[i].innerHTML = await countTotalLikes();
            }
            if (i == 3) {
                summaryContent[i].classList.remove("skeleton", "skeleton_text");
                summaryContent[i].innerHTML = await countTotalMessages();
            }
        }
    }
}

createSummaryContent();

showSingleArticle();

async function showAsideArticles() {
    const secondaryArticles = document.querySelector(".aside_wrapper");
    const articleId = getIdParam();
    if (secondaryArticles != null) {
        const blogs = await getBlogs();
        const articles = blogs.blog_list;
        secondaryArticles.innerHTML = "";
        articles.forEach((article) => {
            if (article._id == articleId) return;
            const likesCount = article.likes;
            const commentsCount = article.comments.length;
            let likesIconClass = "fa-regular fa-heart";
            if (likesCount > 0) likesIconClass = "fa-solid fa-heart";
            const smallArticle = document.createElement("div");
            smallArticle.classList = "small_article";
            smallArticle.innerHTML = `
            <div class="small_article_thumbnail">
                <img src="${article.img}">
                <div class="date_comment_and_like">
                    <p class="article_date">
                        ${article.createdAt.substring(0, 10)}
                    </p>
                    <ul class="comment_and_like">
                        <li>
                            <i class="${likesIconClass}"></i>
                            <span class="likes_count">${likesCount}</span>
                        </li>
                        <li>
                            <i class="fa-regular fa-comment"></i>
                            <span class="comments_count">${commentsCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="small_article_show_case">
                <a class="small_article_title" href="./article.html?id=${
                    article._id
                }">${article.title}</a>
                <p class="small_article_summary">${article.content.substring(
                    0,
                    20
                )}</p>
            </div>
            `;
            secondaryArticles.appendChild(smallArticle);
        });
    }
}

showAsideArticles();

async function showMessagesTable() {
    const data = await getMessages();
    const messages = data.messages;
    let table = document.querySelector("#messageTable");
    let tableBody = document.querySelector("#messageTable tbody");
    if (tableBody) {
        if (messages.length == 0) {
            tableBody.innerHTML = "";
            const emptyTextParagraph = document.createElement("p");
            emptyTextParagraph.classList = "no_blogs_found";
            emptyTextParagraph.innerText = "No messages received yet";
        } else {
            tableBody.innerHTML = "";
            messages.forEach((message) => {
                const messageRow = document.createElement("tr");
                messageRow.innerHTML = `
                <td>
                    <i class="fa-solid fa-message"></i>
                </td>
                <td>${message.createdAt.substring(0, 10)}</td>
                <td>${message.message.substring(0, 20)}...</td>
                <td>${message.first_name} ${message.last_name}</td>
                <td>${message.mail}</td>
                <td>${message.phone}</td>
                <td>
                    <a href="mailto:${message.mail}" target="_blank">
                        <i class="fa-solid fa-reply"></i>
                    </a>
                </td>
                <td>
                    <i class="fa-solid fa-trash-can" onclick="deleteMessage('${
                        message._id
                    }')"></i>
                </td>
                `;
                tableBody.appendChild(messageRow);
            });
        }
    }
}

async function deleteMessage(id) {
    const authToken = localStorage.getItem("token");
    try {
        const response = await fetch(apiURL + `messages/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authToken,
            },
        });
        const result = await response.json();
        if (result.error) {
            toast.classList = "toast show";
            errorIcon.classList = "icon_error active";
            errorMessage.classList = "message_error active";
            setTimeout(() => {
                toast.classList = "toast";
                errorIcon.classList = "icon_error";
                errorMessage.classList = "message_error";
            }, 3000);
            return;
        }
        toast.classList = "toast show";
        successIcon.classList = "icon_success active";
        successMessage.classList = "message_success active";
        setTimeout(() => {
            toast.classList = "toast";
            successIcon.classList = "icon_success";
            successMessage.classList = "message_success";
        }, 3000);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}
showMessagesTable();
