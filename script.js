    const fileinput = document.querySelector(".file-input"),
    filteroptions = document.querySelectorAll(".filter button"),
    filtername = document.querySelector(".filter-info .name"),
    filtervalue =document.querySelector(".filter-info .value"),
    filterslider = document.querySelector(".slider input"),
    rotateoption= document.querySelectorAll(".rotate button"),
    previewimg = document.querySelector(".preview-img img"),
    resetfilterbtn = document.querySelector(".reset-filter"),
    chooseimgbtn = document.querySelector(".choose-img"),
    saveimgbtn = document.querySelector(".save-img");


let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, fliphorizontal = 1, flipvertical = 1;

const applyfilter = () => {
    previewimg.style.transform = `rotate(${rotate}deg) scale(${flipvertical},${fliphorizontal})`;
    previewimg.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `
}

const loadimage = () => {
    let file = fileinput.files[0]; // getting user selected files
    if (!file) return; // return if user has not selected file
    previewimg.src = URL.createObjectURL(file); // passing file URL as preview img src
    previewimg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

filteroptions.forEach(option => {
    option.addEventListener("click", () => { //adding click event listener to all filter buttons
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active"); 
        filtername.innerText = option.innerText;
        
        if (option.id === "brightness") {
            filterslider.max = "200";
            filterslider.value = brightness;
            filtervalue.innerText = `${brightness}%`;
        } else if (option.id === "saturation") {
             filterslider.max = "200";
            filterslider.value = saturation;
            filtervalue.innerText = `${saturation}%`;
        } else if (option.id === "inversion") {
             filterslider.max = "100";
            filterslider.value = inversion;
            filtervalue.innerText = `${inversion}%`;
        } else {
             filterslider.max = "200";
            filterslider.value = grayscale;
            filtervalue.innerText = `${grayscale}%`;
        } 
    
    });
});

const updatefilter = () =>
{
    filtervalue.innerText = `${filterslider.value}%`;
    const selectedfilter = document.querySelector(".filter .active"); //getting selected filter btn

    if (selectedfilter.id === "brightness") {
        brightness = filterslider.value;  
    } else if (selectedfilter.id === "saturation") {
         saturation = filterslider.value; 
    }  else if (selectedfilter.id === "inversion") {
         inversion = filterslider.value; 
    }  else {
         grayscale = filterslider.value; 
    }
    applyfilter();
}

 rotateoption.forEach(option => {
    option.addEventListener("click", () => { //adding click event listener to all rotate/flip buttons 
        if (option.id == "left") {
            rotate -= 90; //if clicked btn is left rotate,decrement rotate value by -90
        } else if (option.id === "right") {
           rotate += 90; //if clicked btn is right rotate,increment rotate value by +90 
        } else if (option.id === "horizontal") {
            //if fliphorizontal value is 1,set this value to -1 else set 1
              fliphorizontal = fliphorizontal === 1 ? -1 : 1;
        } else if(option.id==="vertical") {
            //if flipvertical value is 1 , set this value to -1 else set 1
            flipvertical = flipvertical === 1 ? -1 : 1;
        }
        applyfilter();
    });
 }); 

const resetfilter = () => { //reset all value to previous ones 
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; fliphorizontal = 1; flipvertical = 1;
    rotate = 0; fliphorizontal = 1; flipvertical = 1;
    filteroptions[0].click();//clicking brightness btn,so that the brightness selected by default
    applyfilter();
}
 
const saveimg=() => {
    const canvas = document.createElement("canvas"); //creating canvas element
    const ctx = canvas.getContext("2d");//canvas.getcontext return a drawing context on the canvas
    canvas.width = previewimg.naturalWidth;//setting canvas width to actual image width
    canvas.height = previewimg.naturalHeight;//setting canvas height to actual image height

    //applying user selected filters to canvas filter
    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    ctx.translate(canvas.width / 2, canvas.height / 2); //translating canvas from center
    if (rotate !== 0) { //if rotate value is not 0, rotate the canvas
        
    }
    ctx.scale(fliphorizontal, flipvertical); //flip canvas ,horizontally/vertically
    ctx.drawImage(previewimg, -canvas.width/2,canvas.height/2 , canvas.width, canvas.height);
    document.body.appendChild(canvas);
}

fileinput.addEventListener("change", loadimage);
filterslider.addEventListener("input", updatefilter);
resetfilterbtn.addEventListener("click", resetfilter);
saveimgbtn.addEventListener("click", saveimg);
chooseimgbtn.addEventListener("click", () => fileinput.click());
