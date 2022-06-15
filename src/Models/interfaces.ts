export interface StoreInterface {
  tree: any;
  getTree: () => void;
};

export interface ButtonInterface {
  name: string;
  content: string;
  classProps: string;
  clickHandler: () => void;
  disabled: boolean;
};
