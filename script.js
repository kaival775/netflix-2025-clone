const cards=document.querySelector('.trendingCards');
const scrollLeft=document.getElementById('scrollLeft');
const scrollRight=document.getElementById('scrollRight');
const plusButtons = document.querySelectorAll('.plus');
const descElements = document.querySelectorAll('.desc');
const questions=document.querySelectorAll('.questionCard');
function updateButton(){
    if(cards.scrollLeft <= 0)
    {
        scrollLeft.style.display="none";
    }
    else
    {
        scrollLeft.style.display='block';
    }

    if(cards.scrollLeft +cards.clientWidth +3>=cards.scrollWidth){
        scrollRight.style.display='none';
    }
    else{
        scrollRight.style.display='block';
    }
}

updateButton();

cards.addEventListener('scroll',updateButton);

scrollLeft.addEventListener('click',()=>{
    cards.scrollBy({ left: -850, behavior: "smooth" });
    setTimeout(updateButton,500);
});

scrollRight.addEventListener("click", () => {
  cards.scrollBy({ left: 850, behavior: "smooth" });
  setTimeout(updateButton, 500);
});

// Initialize all descriptions to be hidden
descElements.forEach(desc => {
  desc.style.display = "none";
});

// Track which description is currently open
let openDescIndex = -1;

// Add click event listeners to all question buttons
questions.forEach((question, index) => {
  let isFold = true;
  question.addEventListener('click', () => {
    // Check if this question is already open
    const isCurrentlyOpen = openDescIndex === index;
    
    // Close any open description first
    if(openDescIndex !== -1) {
      questions[openDescIndex].children[1].style.transform="rotate(0deg)";
      descElements[openDescIndex].style.display = "none";
      // Get the previously open question and update its fold state
      const prevQuestion = questions[openDescIndex];
      prevQuestion._isFold = true;
      // Also update the local isFold variable if we're in the same closure
      if(openDescIndex === index) {
        isFold = true;
      }
    }
    
    // If we clicked on an already open question, just leave it closed
    if(isCurrentlyOpen) {
      openDescIndex = -1;
    } else {
      // Otherwise, open the clicked question
      question.children[1].style.transform="rotate(45deg)";
      descElements[index].style.display = "block";
      isFold = false;
      openDescIndex = index;
    }
  });
  // Store the fold state on the element itself
  question._isFold = isFold;
});



