/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/

const navLink = document.querySelectorAll('.nav--link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav--link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-hearder') 
                       : header.classList.remove('bg-hearder')
}
window.addEventListener('scroll', scrollHeader)


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const section = document.querySelectorAll('section[id')

const scrollActive = ()=>{
    const scrollY = window.pageYOffset

    section.forEach(current =>{
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute('id'),
        sectionClass = document.querySelector('.nav--menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionClass.classList.add('active-link')
        }else{
            sectionClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll',scrollActive)
/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the tag with the scrollup

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                :scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollUp)
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin:'top',
    distance:'60px',
    duration: 2500,
    delay:400,
})

sr.reveal(`.home--data, .footer--container, .footer--group`)
sr.reveal(`.home--img`,{delay: 700,origin:'bottom'})
sr.reveal(`.logos--img, .program--card, .pricing--card`,{interval: 100})
sr.reveal(`.choose--img, .calculate--content`,{origin:'left'})
sr.reveal(`.choose--content, .calculate--img`,{origin:'right'})




/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form'),
    calculateCm = document.getElementById('calculate-cm'),
    calculateKg = document.getElementById('calculate-kg'),
    calculateMessage = document.getElementById('calculate--message')

const calculateBmi = (e) =>{
    e.preventDefault()

    // Check if the fields have value
    if(calculateCm.value ===''|| calculateKg.value === ''){
        // Add and remove color
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')

        //show message
        calculateMessage.textContent = 'Fill in the Height and Weight'

        // Remove message three seconds
        setTimeout(()=>{
            calculateMessage.textContent = ''
        },3000)
    }
    else{
        // BMI Formula
        const cm = calculateCm.value / 100,
                kg = calculateKg.value,
                bmi = Math.round(kg / (cm * cm))

                // Show your health status
                if(bmi < 18.5){
                    // Add color and display message
                    calculateMessage.classList.add('color-green')
                    calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny `
                } else if(bmi < 25){
                    calculateMessage.classList.add('color-green')
                    calculateMessage.textContent =`Your BMI is ${bmi} and you are healthy`
                }
                else {
                    calculateMessage.classList.add('color-green')
                    calculateMessage.textContent =`Your BMI is ${bmi} and you are overweight`
                }
                // To Clear the input feild

                calculateCm.value= ''
                calculateKg.value= ''

                //Remove message four secounds

                setTimeout(() =>{
                    calculateMessage.textContent = ''
                }, 4000)
        }
}

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
        contactMessage = document.getElementById('contact-message'),
        contactUser = document.getElementById('contact-user')

const sendEmail = (e)=>{
    e.preventDefault()

    // Check if the field has a value
    if (contactUser.value === ''){
        // Add and Remove color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')

        //Show message
        contactMessage.textContent = 'You must enter your email'

        //Remove message three seconds
        setTimeout(()=>{
            contactMessage.textContent = ''
        }, 3000)
    }
    else{
        // seviceID - TemplateID - #form - publicKey
        emailjs.sendForm('service_q20yhys','template_b4eznmd','#contact-form','kK6474VLxIJres0BX')
        .then(()=>{

            //Show message and add color
            contactMessage.classList.add('color-green')
            contactMessage.textContent = 'You registered successfully'

            // Remove message after three seconds
            setTimeout(()=>{
                contactMessage.textContent = ''
            }, 3000)
        } , (error)=>{
            //Mail sending error
            alert('OOPS! SOMTHING HAS FAILED...', error)
        })
        // To clear the input filed
        contactUser.value = ''
    }
}
contactForm.addEventListener('submit',sendEmail)