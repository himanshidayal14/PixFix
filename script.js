    const fileinput = document.querySelector(".file-input"),
    filteroptions = document.querySelectorAll(".filter button"),
    filtername = document.querySelector(".filter-info .name"),
    filtervalue =document.querySelector(".filter-info .value")
    filterslider = document.querySelector(".slider input"),
    rotateoption= document.querySelector(".rotate button")
    previewimg = document.querySelector(".preview-img img"),
    chooseimgbtn = document.querySelector(".choose-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

const applyfilter = () => {
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
        
    })
});

fileinput.addEventListener("change", loadimage);
filterslider.addEventListener("input", updatefilter);
chooseimgbtn.addEventListener("click", () => fileinput.click());
