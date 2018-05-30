var caches = [
    {id:1,title:"习近平向汶川地震十周年国际研讨会暨第四届大陆地震国际研讨会致",details:"习近平强调，人类对自然规律的认知没有止境，防灾减灾、抗灾救灾是人类生存发展的永恒课题。科学认识致灾规律，有效减轻灾害风险，实现人与自然和谐共处，需要国际社会共同努力。中国将坚持以人民为中心的发展理念，坚持以防为主、防灾抗灾救灾相结合，全面提升综合防灾能力，为人民生命财产安全提供坚实保障。希望各位代表围绕本次研讨会“与地震风险共处”的主题，踊跃参与，集思广益，为促进减灾国际合作、降低自然灾害风险、构建人类命运共同体作出积极贡献。"},
    {id:1,title:"习近平向汶川地震十周年国际研讨会暨第四届大陆地震国际研讨会致",details:"习近平强调，人类对自然规律的认知没有止境，防灾减灾、抗灾救灾是人类生存发展的永恒课题。科学认识致灾规律，有效减轻灾害风险，实现人与自然和谐共处，需要国际社会共同努力。中国将坚持以人民为中心的发展理念，坚持以防为主、防灾抗灾救灾相结合，全面提升综合防灾能力，为人民生命财产安全提供坚实保障。希望各位代表围绕本次研讨会“与地震风险共处”的主题，踊跃参与，集思广益，为促进减灾国际合作、降低自然灾害风险、构建人类命运共同体作出积极贡献。"},
    {id:1,title:"习近平向汶川地震十周年国际研讨会暨第四届大陆地震国际研讨会致",details:"习近平强调，人类对自然规律的认知没有止境，防灾减灾、抗灾救灾是人类生存发展的永恒课题。科学认识致灾规律，有效减轻灾害风险，实现人与自然和谐共处，需要国际社会共同努力。中国将坚持以人民为中心的发展理念，坚持以防为主、防灾抗灾救灾相结合，全面提升综合防灾能力，为人民生命财产安全提供坚实保障。希望各位代表围绕本次研讨会“与地震风险共处”的主题，踊跃参与，集思广益，为促进减灾国际合作、降低自然灾害风险、构建人类命运共同体作出积极贡献。"},
]

export function add(id,title,details){
    const elem = {
        id:id,
        title:title,
        details:details
    }
    caches.push(elem)
}
export  function list(){
    return caches
}
export  function getElem(id){
    return caches[id]
}