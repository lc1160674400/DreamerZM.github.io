var dict = {
    "village":
        {
            judge_rule_list:["judge_rule_list.html",{
                desc : '村务-任务中心详细信息',
                type : 'get',
                param :{
                    areacode: 'areacode',
                    year:'year',
                    month:'month',
                    ruleType:'1'
                }
            }],
        },
    "cms":
        {
            router_list:["router_list.html",{
                desc : 'cms查询站点列表，返回的是一个list 根据地区编码去匹配',
                type : 'get',
                param :{
                }}],
            villageListUrl1:["cms.html1",{
                desc : 'cms名URL',
                type : 'get',
                param :{
                    userid:"",
                    areacode:''
                }}],
            villageListUrl2:["cms.html2",{
                desc : 'cmsRL',
                type : 'get',
                param :{
                    userid:"",
                    areacode:''
                }}]
        },
    
        
    
    
}
export default dict;
    
