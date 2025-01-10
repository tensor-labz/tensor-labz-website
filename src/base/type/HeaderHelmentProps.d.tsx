 type HeaderHelmentProps= {
    title: string;
    description?: string;
    keywords?:Array<string>;
    logo?:string;
    og?:{
      title?:string;
      description?:string;
      image?:string;
    },
    twitter?:{
      card?:string;
  
    }
  }

  export default HeaderHelmentProps;