"use strict";

class EditInPlaceField{
  constructor(id,parent,value){
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;
    this.createElements(this.id);
    //绑定事件
    this.attachEvents();
  }
  createElements(id){
    this.containerElement = document.createElement('div');
    this.parentElement.appendChild(this.containerElement);

    this.staticElement = document.createElement('span');
    this.containerElement.appendChild(this.staticElement);
    this.staticElement.innerHTML = this.value;

    //创建input
    this.fieldElement = document.createElement('input');
    //类型为文本框
    this.fieldElement.type = "text";
    //给其负值   无名氏
    this.fieldElement.value = this.value;
    //添加到 this.containerElement（div）上
    this.containerElement.appendChild(this.fieldElement);

    //创建保存按钮
    this.saveButtin = document.createElement('input');
    this.saveButtin.type = 'button';
    this.saveButtin.value = "保存";
    this.containerElement.appendChild(this.saveButtin);


    //创建取消按钮
    this.cancelButton = document.createElement('input');
    this.cancelButton.type = 'button';
    this.cancelButton.value = '取消';
    this.containerElement.appendChild(this.cancelButton);

    this.convertToText();
  }
    //将编辑框  及按钮隐藏的一个函数 只显示文本状态
  convertToText(){
    this.fieldElement.style.display = 'none';

    this.saveButtin.style.display = 'none';

    this.cancelButton.style.display = 'none';

    this.staticElement.style.display = 'inline';

    this.setValue(this.value);
  }
  attachEvents(){
    var that = this;
    //给span添加点击事件
    this.staticElement.addEventListener('click',function(){
      //状态切换为编辑
      that.convertToEdittable();
    },false);

    //绑定取消按钮事件
    this.cancelButton.addEventListener('click',function(){
      //从编辑状态却换成文本
      that.cancel();
    },false);

    this.saveButtin.addEventListener('click',function(){
      that.save();
    },false);
  }
  convertToEdittable(){
    //将span 影藏
    this.staticElement.style.display = 'none';

    this.fieldElement.style.display = 'inline';

    this.saveButtin.style.display = 'inline';

    this.cancelButton.style.display = 'inline';
    //设置input 的值
    this.setValue(this.value);
  }
  setValue(value){
    this.fieldElement.value = value;
    this.staticElement.innerHTML = value;
  }
  cancel(){
    this.convertToText();
  }
  save(){
    this.value = this.getValue();
    this.convertToText();
  }
  getValue(){
    return this.fieldElement.value;
  }


}
