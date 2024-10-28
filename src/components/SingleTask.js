export default function(){
    const label = document.createElement("label");
    label.classList.add("label", "cursor-pointer");
    label.innerHTML= `
    <span class= "label-text"> ${text}</span>
    <input type = "checkbox" checked="checked" class="checkbox checkbox-primary"/>`;
    return label;
}