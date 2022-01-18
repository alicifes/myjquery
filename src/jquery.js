window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray === 'string' ){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    return {
        oldApi:selectorOrArray.oldApi,  //返回整个对象的oldApi
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this
        },
        find(selector){
            let classArray=[]
            for(let i = 0;i<elements.length;i++){
                const element2 = Array.from(elements[i].querySelectorAll(selector))
                classArray=classArray.concat(element2)
            }
            classArray.oldApi = this   //这个是旧的api
            return jQuery(classArray) //得到一个新的api对象来操作api
        },
        end(){
            return this.oldApi   //这里的end是新的api
        },
        each(fun){
            for(let i= 0;i<elements.length;i++){
                fun.call(null,elements[i])
            }
            return this
        },
        parent(){ //可能会出现多个array，根据情况进行判断
            let parentArray=[]
            this.each((node)=>{
                 if(parentArray.indexOf(node.parentNode)===-1){ //去重，防止打出多个相同的
                    parentArray.push(node.parentNode)
                 }
            })
            return jQuery(parentArray)
        },
        children(){
            let chidrenArray=[]
            this.each((node)=>{
                chidrenArray.push(...node.children)//可能有多个子array
            })
            return jQuery(chidrenArray)
        },
        siblings(){
            let siblingArray = []
            this.each((node)=>{
                    siblingArray.push(...Array.from(node.parentNode.children))
                    siblingArray = siblingArray.filter(item=>item!=node)  //返回符合条件的所有元素
                })
                return jQuery(siblingArray);
            }
        }
}
window.$ = window.jQuery