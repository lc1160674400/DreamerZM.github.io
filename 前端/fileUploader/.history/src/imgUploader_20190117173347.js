class FileUploader{
    constructor (options){
        if(options){
            this.options = options
        }
        this.MAX_FILE_NUM = 9


    }
    uploader (dom,max_file_num){
        var max_num = max_file_num || this.MAX_FILE_NUM
        console.log(dom,max_file_num)
    }
}



var fileUpLoader = new FileUploader()
