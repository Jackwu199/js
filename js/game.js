//dom加载完毕之后回调事件
window.onload = function(){
	//js继承实现
	Function.prototype.extends = function(base,extend){
		for(var prop in base){
			this.prototype[prop] = base.prototype[prop];
			//复制函数
		}
		for(var prop in extend){
			this.prototype[prop] = extend[prop];
			//复制对象
		}
	}
	//用户  电脑  游戏
	function Player(name){
		this.name = name;
		this.point = 0;//0:石头 1:剪刀 2:布
	}
	Player.prototype.guess = function(){}
	//函数内的arguments属性的使用
	//call和apply的区别
	function User(name){
		Player.call(this,name);
	}
	User.extends(Player,{
		guess : function(point){
			return this.point = point;
		}
	});

	function Comp(name){
		Player.call(this,name);
	}
	Comp.extends(Player,{
		guess : function(){
			//位运算
			return this.point = (Math.random()*100<<2)%3;
		}
	});
	var user = new User('孙悟饭');
	var comp = new Comp('比克大魔王');
	function Game(u,c){
		this.user = u;
		this.comp = c;
		this.init();
	}
	Game.prototype.init = function(){
		var names = document.getElementsByClassName('name');
		names[0].innerText = "我："+this.user.name;
		names[1].innerText = "电脑："+this.comp.name;
	}
	Game.prototype.play = function(){
		console.log('do play');
		this.toggleButton();//让按钮失去功能，改变样式
		this.startAnimate();//开始猜拳动画
	}
	Game.prototype.toggleButton = function(){
		var btn = document.getElementById('play');
		if(btn.disabled){
			btn.disabled = false;
			btn.className = '';
			btn.innerText = '再玩一局';
		}else{
			btn.disabled = true;
			btn.className = 'disabled';
		}
	}
	Game.prototype.startAnimate = function(){
		//让猜拳板出来
		document.getElementById('guess').style.display='block';
		//改变提示文本
		this.changeHint('请出拳...');
		var anims = document.getElementsByClassName('anim');
		var count = 0;
		//计时器
		//console.log();
		this._interval = window.setInterval(function(){
			anims[0].className = 'anim user guess'+(count++)%3;
			anims[1].className = 'anim user guess'+(count++)%3;
		},500);
	}
	Game.prototype.changeHint = function(message){
		document.getElementById('text').innerText = message;
	}
	Game.prototype.verdict= function(point){
		window.clearInterval(this._interval);
		//获取动画元素
		var anims = document.getElementsByClassName('anim');
		anims[0].className = 'anim user guess'+this.user.guess(point);
		anims[1].className = 'anim comp guess'+this.comp.guess();
		//让猜拳板消失
		document.getElementById('guess').style.display='none';
		var res = this.user.point - this.comp.point;
		switch(res){
			case 0:
				this.changeHint('平局！！！');
				break;
			case -1:
			case 2:
				this.changeHint('Yea~我赢了！');
				break;
			case 1:
			case -2:
				this.changeHint('55555~我输了！');
				break;
			
		}
		this.toggleButton();
	}
	game = new Game(user,comp);
	
}
var game;
