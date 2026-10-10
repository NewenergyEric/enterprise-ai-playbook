export const stage=(title,input,judgment,action,output,next)=>({title,input,judgment,action,output,next});
export const decision=(title,signal,choice,impact)=>({title,signal,choice,impact});
export const compare=(title,before,work,after)=>({title,before,work,after});
const playbookModule=(title,input,method,output,check)=>({title,input,method,output,check});
export {playbookModule as module};
