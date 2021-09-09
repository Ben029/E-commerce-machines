export class Material {
        //attributs
        _id: string;
        type: string;
        mark: string;
        description: string;
        price: number;
        nbrInStock: number;
        imgUrl: string;
        added: boolean;
        nbreInPanier: number;
        constructor(
                //params
                _type: string,
                _mark: string,
                _description: string,
                _price: number,
                _nbrInStock: number,
                _imgUrl: string,
                _added: boolean,
                _nbreInPanier: number,
        ) {
                // this._id = _id;
                this.type = _type;
                this.mark = _mark;
                this.description = _description;
                this.price = _price;
                this.nbrInStock = _nbrInStock;
                this.imgUrl =  _imgUrl;
                this.added = _added;
                this.nbreInPanier = _nbreInPanier;
        }
};