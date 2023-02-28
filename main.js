function music2color(music){
    colors = ["red", "green", "blue"]
    index = Math.round(Math.random() * 2)
    return colors[index]
}


function onSelected(){
    let music = document.getElementById('musicList').value;
    color = music2color(music);
    document.getElementById("color").style.color=color;
    document.getElementById("color").innerHTML=color;
}

window.addEventListener('DOMContentLoaded', function(){  
    document.getElementById('musicList').addEventListener('click', onSelected);
});