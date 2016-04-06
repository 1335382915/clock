/**
 * Created by qc on 2016/3/31.
 */
var WIDTH=document.documentElement.clientWidth;
var HEIGHT=document.documentElement.clientHeight;
var RADIUS=Math.round(WIDTH*4/5/108)-1;
var MARGIN_LEFT= Math.round(WIDTH/10);//第一个数字距离画布左端的距离
var MARGIN_TOP=Math.round(HEIGHT/5);//距离顶部的距离
var curShowTimeSeconds=0;//当前剩余时间(秒);
var balls=[];
var color=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
var drawing=document.getElementById("canvas");
drawing.width =WIDTH;
drawing.height =HEIGHT;
if(drawing.getContext){
    var context=drawing.getContext("2d");
    curShowTimeSeconds=getTime();
    render(context);
    setInterval(function(){
        render(context),update()
    },50);
}


function getTime()
{
    var curTime=new Date();
    var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();//.getTime获取的是毫秒
    return ret;
}

function addBall(x,y,num)
{
    for(var i=0;i<digit[num].length;i++)
    {
        for(var j=0;j<digit[num][i].length;j++)
        {
            if(digit[num][i][j]==1)
            {
                var ball={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5,
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-4,
                    color:color[Math.floor(Math.random()*10)]
                }
                balls.push(ball);
            }
        }
    }
}
function updateBall()
{
    for(var i=0;i<balls.length;i++)
    {
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;
        if(balls[i].y>=HEIGHT-RADIUS)
        { balls[i].y=HEIGHT-RADIUS;
            balls[i].vy=-balls[i].vy*0.75;
        }
    }
    var cnt = 0;
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS <WIDTH)
            balls[cnt++] = balls[i]
    while( balls.length > cnt ){
        balls.pop();
    }
}
function update() {
    var nextShowTimeSeconds=getTime();
    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds=nextShowTimeSeconds%60;
    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds=curShowTimeSeconds%60;
    if (nextSeconds!=curSeconds) {
        if (parseInt(curHours/10)!=parseInt(nextHours/10))addBall(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours/10));
        if (parseInt(curHours%10)!=parseInt(nextHours%10))addBall(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(nextHours%10));
        if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10))addBall(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes/10));
        if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10))addBall(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes%10));
        if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10))addBall(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds/10));
        if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10))addBall(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
        curShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBall();
    console.log(balls.length);
}

function render(con){
    con.clearRect(0,0,WIDTH,HEIGHT);//先清除画布,否则会叠加
    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds=curShowTimeSeconds%60;
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),con);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),con);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,con);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),con);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),con);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,con);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),con);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),con);
    for(var i=0;i<balls.length;i++)
    {
        con.fillStyle=balls[i].color;
        con.beginPath();
        con.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
        con.closePath();
        con.fill();
    }
}


function renderDigit(x,y,num,con){
    con.fillStyle = "rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if (digit[num][i][j]==1){
                con.beginPath();
                con.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                con.closePath();
                con.fill();
            }
        }
    }
}