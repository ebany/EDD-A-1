class Nodo {
    constructor(nombre) {
        this.nombre = nombre;
        this.hijos = [];
    }

    insertar(ruta) {
        if (ruta[0] === this.nombre) {
            let nuevaRuta = ruta.slice(1);
            if (nuevaRuta.length > 1) {
                for (let i = 0, sizeI = this.hijos.length; i < sizeI; i++) {
                    let resultado = this.hijos[i].insertar(nuevaRuta);
                    if (resultado) {
                        return true;
                    }
                }
            } else {
                this.hijos.push(new Nodo(nuevaRuta[0]));
                return true;
            }
        }
        return false;
    }
}

class Arbol {
    constructor() {
        this.arbol = new Nodo('/');
    }

    insertar(rutaString) {
        let ruta = rutaString.split('/');
        ruta[0] = '/';
        this.arbol.insertar(ruta);
    }

    graficar(nodo, id) {
        let txt = ' Nodo' + id + ' [label =\"' + nodo.nombre + '\"] ';

        for (const item of nodo.hijos) {
            let nombreHijo = this.getId();
            txt += this.graficar(item, nombreHijo);
            txt += ' Nodo' + id + ' -> Nodo' + nombreHijo + ' ';
        }

        return txt;
    }

    getId() {
        return "id" + Math.random().toString(16).slice(2);
    }
}

let arbol = new Arbol();

arbol.insertar('/hola1');
arbol.insertar('/hola2');
arbol.insertar('/hola3');
arbol.insertar('/hola3/hola3.1');
arbol.insertar('/hola3/hola3.2');
arbol.insertar('/hola3/hola3.1/hola3.1.1');
arbol.insertar('/hola3/hola3.1/hola3.1.1/hola3.1.1.2');
arbol.insertar('/hola3/hola3.1/hola3.1.1/hola3.1.1.1');
arbol.insertar('/hola4');
arbol.insertar('/hola5');
arbol.insertar('/a');
arbol.insertar('/a/b');

arbol.insertar('/a/b/c');
arbol.insertar('/a/b/d');
arbol.insertar('/a/b/e');
arbol.insertar('/a/b/f');
arbol.insertar('/a/b/g');
arbol.insertar('/a/b/h');

arbol.insertar('/a/1');
arbol.insertar('/a/2');
arbol.insertar('/a/3');
arbol.insertar('/a/4');

let dot = 'digraph MatrizCapa{ node [shape=box]; ' + arbol.graficar(arbol.arbol, arbol.getId()) + ' }';

document.getElementById("ejemplo").innerHTML = dot;
document.getElementById("image").src = 'https://quickchart.io/graphviz?graph=' + dot;