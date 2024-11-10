/// <reference types="../@types/jquery"/>
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let contactContainer = document.getElementById("contactContainer");
let submitBtn;
// Loading screen
$(function() {
    
    searchByName("").then(function(){
        $(".loading-screen").fadeOut(500,function(){
            $(".loading-screen").remove})
        $("body").css("overflow", "visible")

    })
})
// open and close nav bar
function openSideNav() {
    $(".side-nav").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav .navlinks").outerWidth()
    $(".side-nav").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".open-close-icon").on("click",function(){
    if ($(".side-nav").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
// display meals
function displayMeals(arra) {
    let cartoona = "";

    for (let i = 0; i < arra.length; i++) {
        cartoona += `
            <div class="lg:col-span-3 md:col-span-4 ">
                <div onclick="getMealDetails('${arra[i].idMeal}')" class="meal relative overflow-hidden rounded-md cursor-pointer">
                        <img class="w-full" src="${arra[i].strMealThumb}" alt="meals" srcset="">
                        <div class="meal-layer absolute flex items-center text-black p-2">
                           <h3 class="text-3xl font-medium">${arra[i].strMeal}</h3>
                        </div>
                </div>
            </div>
        `
    }

    rowData.innerHTML = cartoona
}
// Search
async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}
async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}
function showSearchInputs() {
    searchContainer.innerHTML = `
                   <div class="relative md:mt-6 sm:mt-6 rounded-md shadow-sm col-span-2">
            <input onkeyup="searchByName(this.value)" type="text" name="search by name" id="by name"
                class="block w-full rounded-md border-0 py-2 pl-4 pr-20 bg-black text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m/6"
                placeholder="Search By Name">

        </div>
        <div class="relative md:mt-6 sm:mt-0 rounded-md shadow-sm col-span-2">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" type="text" name="first letter" id="by letter"
                class="block w-full rounded-md border-0 py-2 pl-4 pr-20 bg-black text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m/6"
                placeholder="Search By First Letter">

        </div>`

    rowData.innerHTML = ""
}
$(".search").on("click",function(){
    showSearchInputs();
    closeSideNav()
})
// Category
async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}

function displayCategories(arra) {
    let cartoona = "";

    for (let i = 0; i < arra.length; i++) {
        cartoona += `
        <div class="lg:col-span-3 md:col-span-4 " >
                <div onclick="getCategoryMeals('${arra[i].strCategory}')" class="meal relative overflow-hidden rounded-md cursor-pointer">
                    <img class="w-full" src="${arra[i].strCategoryThumb}" alt="Meal" srcset="">
                    <div class="meal-layer absolute items-center text-black p-2 text-center">
                        <h3 class="text-3xl font-medium">${arra[i].strCategory}</h3>
                        <p>${arra[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}
async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
$(".Categories").on("click",function(){
    getCategories(); closeSideNav()
})
// Area
async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)


}

function displayArea(arra) {
    let cartoona = "";
    for (let i = 0; i < arra.length; i++) {
        cartoona += `
        <div class="lg:col-span-3 md:col-span-4 ">
                <div onclick="getAreaMeals('${arra[i].strArea}')" class="rounded-md text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="text-[1.75rem] font-medium">${arra[i].strArea}</h3>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}
async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)
}
$(".area").on("click",function(){
    getArea(); closeSideNav()
    rowData.classList.replace()
})
// ingrediant
async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

function displayIngredients(arra) {
    let cartoona = "";
    for (let i = 0; i < arra.length; i++) {
        cartoona += `
        <div class="lg:col-span-3 md:col-span-4 ">
                <div onclick="getIngredientsMeals('${arra[i].strIngredient}')" class="rounded-md text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="text-3xl font-medium">${arra[i].strIngredient}</h3>
                        <p>${arra[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
$(".Ingredients").on("click",function(){
    getIngredients(); closeSideNav()
})
// Meal Details
async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}

function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `        <div class="w-fit m-2 bg-teal-100 border border-teal-200 text-base text-teal-800 rounded-md p-1 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" role="alert" tabindex="-1" aria-labelledby="hs-soft-color-success-label">
            ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
          </div>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <div class="w-fit m-2 bg-red-100 border border-red-200 text-base text-red-800 rounded-md p-1 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert" tabindex="-1" aria-labelledby="hs-soft-color-danger-label">
            ${tags[i]}          </div>`
    }



    let cartoona = `
    <div class=" lg:col-span-4 md:col-span-12">
                <img class="w-full rounded-lg" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-[2rem] font-medium mb-2">${meal.strMeal}</h2>
            </div>
            <div class="lg:col-span-8 md:col-span-12">
                <h2 class="text-[2rem] font-medium mb-2">Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3 class="text-[1.75rem] font-medium "><span class="font-bold">Area : </span>${meal.strArea}</h3>
                <h3 class="text-[1.75rem] font-medium "><span class="font-bold">Category : </span>${meal.strCategory}</h3>
                <h3 class="text-[1.75rem] font-medium ">Recipes :</h3>
                <ul class=" flex  flex-wrap">
                    ${ingredients}
                </ul>

                <h3 class="text-[1.75rem] font-medium mb-2">Tags :</h3>
                <ul class="flex mb-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="py-1.5 px-3 inline-flex items-center gap-x-2 text-base font-normal rounded-md border border-transparent bg-[#198754] text-white hover:bg-[#157347] focus:outline-none focus:bg-[#13653f] disabled:opacity-50 disabled:pointer-events-none">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="py-1.5 px-3 inline-flex items-center gap-x-2 text-base font-normal rounded-md border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}




// 
function showContacts() {
    
    rowData.innerHTML = `<div class="contact lg:col-span-12 md:col-span-12 flex justify-center items-center" id="contactContainer">
            <div class="container text-center md:w-[96%] sm:w-[96%] mx-auto ">
                <div class="grid text-center w-3/4 mx-auto md:grid-cols-2 gap-6">
                    <div >
                        <input  onkeyup="inputsValidation()"  type="text" id="nameInput"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Your Name" />
                        <div id="nameAlert"
                            class="hidden p-4 mt-2 mb-4 text-center text-base text-[#842029] rounded-lg bg-[#f8d7da] dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            Special characters and numbers not allowed
                        </div>
                    </div>
    
                    <div>
                        <input onkeyup="inputsValidation()" type="email" id="emailInput"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Your Email" />
                        <div id="emailAlert"
                            class="hidden p-4 mt-2 mb-4 text-center text-base text-[#842029] rounded-lg bg-[#f8d7da] dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            Email not valid *exemple@yyy.zzz
                        </div>
                    </div>
                    <div>
                        <input onkeyup="inputsValidation()" type="text" id="phoneInput"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Your Phone" />
                        <div id="phoneAlert"
                            class="hidden p-4 mt-2 mb-4 text-center text-base text-[#842029] rounded-lg bg-[#f8d7da] dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            Enter valid Phone Number
                        </div>
                    </div>
                    <div>
                        <input onkeyup="inputsValidation()" type="number" id="ageInput"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Your Age" />
                        <div id="ageAlert"
                            class="hidden p-4 mt-2 mb-4 text-center text-base text-[#842029] rounded-lg bg-[#f8d7da] dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            Enter valid age
                        </div>
                    </div>
                    <div>
                        <input onkeyup="inputsValidation()" type="password" id="passwordInput"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Your Password" />
                        <div id="passwordAlert"
                            class="hidden p-4 mt-2 mb-4 text-center text-base text-[#842029] rounded-lg bg-[#f8d7da] dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                        </div>
                    </div>
                    <div>
                        <input onkeyup="inputsValidation()" type="password" id="repasswordInput"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Repassword" />
                        <div id="repasswordAlert"
                            class="hidden p-4 mt-2 mb-4 text-center text-base text-[#842029] rounded-lg bg-[#f8d7da] dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            Enter valid repassword
                        </div>
                    </div>
    
                </div>
                <button id="submitBtn"
                    class="disabled:pointer-events-none disabled:opacity-65
                    px-2 py-1.5 mt-4 bg-transparent hover:bg-[#dc3545] text-[#dc3545] font-normal hover:text-white  border border-red-500 hover:border-transparent rounded-md"
                    disabled>
                    Submit
                </button>
            </div>      
        </div>
`
    
    submitBtn = document.getElementById("submitBtn")

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

$(".ContactUs").on("click",function(){
    showContacts(); closeSideNav()

    
})

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("block", "hidden")

        } else {
            document.getElementById("nameAlert").classList.replace("hidden", "block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("emailAlert").classList.replace("hidden", "block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("phoneAlert").classList.replace("hidden", "block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("ageAlert").classList.replace("hidden", "block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("passwordAlert").classList.replace("hidden", "block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("block", "hidden")
        } else {
            document.getElementById("repasswordAlert").classList.replace("hidden", "block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
