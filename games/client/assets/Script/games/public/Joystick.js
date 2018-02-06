cc.Class({
    extends: cc.Component,

    properties: {

        obj: {
            default: null,
            type: cc.Node,
        },
        eight_dir: {
            default: true,
            type: cc.Boolean,
        },
        MoveSpeed: {
            default: 1,
            type: cc.Float,
        },
  
        _max_radius: 120,
        _min_radius: 60,
        _directionType:-1,
        mask:cc.Mask,
    },
    
    // [0, 7] // 上(0)，下(1)，左(2)，右(3)， 右上(4)，左上(5)，左下(6)，右下(7)
    // 为什么要这样做？因为有可能我们的遥感，不需要8个方向。
    compute_8_dir: function(alpha) {
        
        if(alpha >= 0 && alpha < Math.PI * 1 / 8) { // 右边
            return 3;
        }
        else if(alpha >= Math.PI * 1 / 8 && alpha < Math.PI * 3 / 8) { // 右上
            return 4;
        }
        else if(alpha >= Math.PI * 3 / 8 && alpha < Math.PI * 5 / 8) { // 上
            return 0;
        }
        else if(alpha >= Math.PI * 5 / 8 && alpha < Math.PI * 7 / 8) { // 左上
            return 5;
        }
        else if(alpha >= Math.PI * 7 / 8 && alpha < Math.PI * 9 / 8) { // 左
            return 2;
        }
        else if(alpha >= Math.PI * 9 / 8 && alpha < Math.PI * 11 / 8) { // 左下
            return 6;
        }
        else if(alpha >= Math.PI * 11 / 8 && alpha < Math.PI * 13 / 8) { // 下
            return 1;
        }
        else if(alpha >= Math.PI * 13 / 8 && alpha < Math.PI * 15 / 8) { // 右下
            return 7;
        }
        else if(alpha >= Math.PI * 15 / 8 && alpha < Math.PI * 2) { // 右边
            return 3;
        }
        
        return -1;
    },
    
    compute_4_dir: function(alpha) {
        
        if(alpha >= 0 && alpha < Math.PI * 1 / 4) { // 右边
          
            return 3;
        }
        else if(alpha >= Math.PI * 1 / 4 && alpha < Math.PI * 3 / 4) { //上
            return 0;
        }
        else if(alpha >= Math.PI * 3 / 4 && alpha < Math.PI * 5 / 4) { // 左
            return 2;
        }
        else if(alpha >= Math.PI * 5 / 4 && alpha < Math.PI * 7 / 4) { // 下
            return 1;
        }
        else if(alpha >= Math.PI * 7 / 4 && alpha < Math.PI * 2) { // 右
            return 3;
        }
       
        
        return -1;
    },
    
    send_joystick_event: function(dir){
        if(dir === -1) { // 停止的一个事件。
            this.enabled = false;
            this._directionType = -1;
            return;
        } 
        this.enabled = true;
        var dir_name = ["up", "down", "left", "right", "right_up", "left_up", "left_down", "right_down"];
        this._directionType = dir_name[dir];
        // 广播我们的遥感事件出去。发送我们的自定义事件，因为我在编写遥感的时候，我并不知道那些对象将会使用遥感。
        // 所以我们这里采用上一节课学过的自定义事件的机制，将这个自定义的时间广播出去，那个对象对这个遥感时间感兴趣，
        // 那么他自己坚挺这个时间就可以了。
        // 事件名称 + 方向。
       // this.node.emit("joystick_event", {params: dir_name[dir]});
    }, 
        
    // use this for initialization
    onLoad: function () {
        // 中间的按钮来监听触摸消息
        var joystick = this.node.getChildByName("thumbstick");
        
        joystick.on(cc.Node.EventType.TOUCH_START, function(event) {
            //  停止事件发送给父亲节点
            event.stopPropagation();

            var w_pos = event.getLocation(); // 获取触摸屏的世界坐标
            // 将这个世界坐标，转成我们当前这个节点的节点相对坐标。
            var pos = this.node.convertToNodeSpace(w_pos); // pos

            joystick._startPos = pos;
            // end
        }.bind(this));
        
        
        joystick.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
            // 触摸移动的事件
            var w_pos = event.getLocation(); // 获取触摸屏的世界坐标
            // 将这个世界坐标，转成我们当前这个节点的节点相对坐标。
            var pos = this.node.convertToNodeSpace(w_pos); // pos

            var distance = this._getDistance(pos, event.target);

            //半径
            var width_radius = event.target.getBoundingBox().width / 1.5;
            var height_radius = event.target.getBoundingBox().height / 1.5;
            var len = Math.sqrt((pos.x - 0) * (pos.x - 0) + (pos.y - 0) * (pos.y - 0));
            if (len <= this.min_radius) { // 不属于任何方向。
                return;
            }
            // 限制半径的范围
            // 根据相似三角形。 斜边/斜边 = 直角边/直角边
            if(len > this.max_radius) { // 限制这个范围
                pos.x = (pos.x * this.max_radius) / len;
                pos.y = (pos.y * this.max_radius) / len;
                len = this.max_radius; // 当前x, y,对应的len
            }
            // end
            var alpha = Math.asin(pos.y / len);
            alpha = Math.abs(alpha); // 变成与x轴的夹角。

            if(pos.x >= 0 && pos.y >= 0) { // 第一象限
                alpha = alpha;
            }
            else if(pos.x <= 0 && pos.y >= 0) { // 第二象限
                alpha = Math.PI - alpha;
            }
            else if(pos.x <= 0 && pos.y <= 0) { // 第三象限
                alpha = Math.PI + alpha;
            }
            else if(pos.x >= 0 && pos.y <= 0) { // 第四象限
                alpha = Math.PI * 2 - alpha;
            }

            if(Math.abs(pos.x-joystick._startPos.x)<=width_radius&&Math.abs(pos.y-joystick._startPos.y)<=height_radius)
            {
                joystick.x = pos.x;
                joystick.y = pos.y;
            } 

            
            // 计算方向
            var dir = -1;
            if(this.eight_dir) {
                dir = this.compute_8_dir(alpha);
            }
            else {
                dir = this.compute_4_dir(alpha);
            }
            // end 
           
            this.send_joystick_event(dir);
        }.bind(this));
        
        
        joystick.on(cc.Node.EventType.TOUCH_END, function(event) {
            // 触摸节点回到原点
            joystick.x = 0;
            joystick.y = 0;
            this.send_joystick_event(-1);
        }.bind(this));
        
        joystick.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
            // 触摸节点回到原点
            joystick.x = 0;
            joystick.y = 0;
            this.send_joystick_event(-1);
        }.bind(this));
        // end

        this.enabled = false;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var self = this;
            switch(this._directionType){ 
                case "up":
                    self.obj.y+=self.MoveSpeed;
                    self.obj.scaleX = 1;
                    self.obj.rotation = -90;
                break;
                case "down":
                    self.obj.y-=self.MoveSpeed;
                    self.obj.scaleX = 1;
                    self.obj.rotation = 90;
                break;   
                case "left":
                    self.obj.x-=self.MoveSpeed;
                    self.obj.scaleX = -1;
                    self.obj.rotation = 0;
                break;
                case "right":
                    self.obj.x+=self.MoveSpeed;
                    self.obj.scaleX = 1;
                    self.obj.rotation = 0;
                break;
                case "right_up":
                    self.obj.x+=self.MoveSpeed;
                    self.obj.y+=self.MoveSpeed;
                break;
                case "left_up":
                    self.obj.x-=self.MoveSpeed;
                    self.obj.y+=self.MoveSpeed;
                break;
                case "left_down":
                    self.obj.x-=self.MoveSpeed;
                    self.obj.y-=self.MoveSpeed;
                break;
                case "right_down":
                    self.obj.x+=self.MoveSpeed;
                    self.obj.y-=self.MoveSpeed;
                break;
             
            }
            this._addCircle(self.obj);
    },

    _addCircle:function (point) {
        var stencil = this.mask._clippingStencil;
        var color = cc.color(0, 0, 0,100);
        if(stencil){
            stencil.drawPoly(this.mask._calculateCircle(point,cc.p(40,40),64), color, 0, color);
        }

        if (!CC_JSB) {
            cc.renderer.childrenOrderDirty = true;
        }
    },

    //计算两点间的距离并返回
    _getDistance: function(pos1, pos2)
    {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +
        Math.pow(pos1.y - pos2.y, 2));
    }
});
