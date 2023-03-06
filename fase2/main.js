
class NodoMatriz {
    constructor(valor) {
        this.siguiente = null;
        this.anterior = null;

        this.abajo = null;
        this.arriba = null;

        this.valor = valor;

        this.valorX = null;
        this.valorY = null;
    }

    //inserte en horizontal
    insertarEnY(valorX, valorY) {
        let actual = this.siguiente;
        let nuevoNodo = new NodoMatriz(undefined);
        nuevoNodo.valorX = valorX;
        nuevoNodo.valorY = valorY;

        if (actual) {
            while (actual.siguiente) {
                if (actual.valorX < nuevoNodo.valorX) {
                    actual = actual.siguiente;
                } else {
                    nuevoNodo.siguiente = actual;
                    actual.anterior.siguiente = nuevoNodo;
                    actual.anterior = nuevoNodo;
                    return nuevoNodo;
                }
            }

            if (actual.valorX < nuevoNodo.valorX) {
                actual.siguiente = nuevoNodo;
                nuevoNodo.anterior = actual;
            } else {
                nuevoNodo.siguiente = actual;
                actual.anterior.siguiente = nuevoNodo;
                actual.anterior = nuevoNodo;
            }
        } else {
            this.siguiente = nuevoNodo;
            nuevoNodo.anterior = this;
        }
        return nuevoNodo;
    }

    //inserto en vertical
    insertarEnX(valorY, nuevoNodo) {
        let actual = this.abajo;

        if (actual) {
            while (actual.abajo) {
                if (actual.valorY < valorY) {
                    actual = actual.abajo;
                } else {
                    nuevoNodo.abajo = actual;
                    actual.arriba.abajo = nuevoNodo;
                    actual.arriba = nuevoNodo;
                    return;
                }
            }

            if (actual.valorY < valorY) {
                actual.abajo = nuevoNodo;
                nuevoNodo.arriba = actual;
            } else {
                nuevoNodo.abajo = actual;
                actual.arriba.abajo = nuevoNodo;
                actual.arriba = nuevoNodo;
            }
        } else {
            this.abajo = nuevoNodo;
            nuevoNodo.arriba = this;
        }
        return;
    }

    imprimir(esX) {
        let actual = this;
        let result = '';
        while (actual) {
            result += ("(" + actual.valorX + "," + actual.valorY + ")" + " --> ");
            actual = esX ? actual.siguiente : actual.abajo;
        }
        console.log(result);
    }

}

class Matriz {
    constructor() {
        let cabeza = new NodoMatriz("Raiz");
        cabeza.valorX = "Raiz";
        cabeza.valorY = "Raiz";
        this.cabeza = cabeza;
    }

    insertarCabeza(valor, esX) {
        const cabeza = this.buscarCabeza(valor, esX);
        if (!cabeza) {
            let actual = this.cabeza;
            let nuevaCabeza = new NodoMatriz(valor);
            nuevaCabeza.valorX = esX ? valor : undefined;
            nuevaCabeza.valorY = esX ? undefined : valor;

            if (esX ? actual.siguiente : actual.abajo) {
                actual = esX ? actual.siguiente : actual.abajo;
                while (esX ? actual.siguiente : actual.abajo) {
                    if (actual.valor < nuevaCabeza.valor) {
                        actual = esX ? actual.siguiente : actual.abajo;
                    } else {
                        if (esX) {
                            nuevaCabeza.siguiente = actual;
                            actual.anterior.siguiente = nuevaCabeza;
                            actual.anterior = nuevaCabeza;
                        } else {
                            nuevaCabeza.abajo = actual;
                            actual.arriba.abajo = nuevaCabeza;
                            actual.arriba = nuevaCabeza;
                        }
                        return cabeza;
                    }
                }

                if (esX) {
                    if (actual.valor < nuevaCabeza.valor) {
                        actual.siguiente = nuevaCabeza;
                        nuevaCabeza.anterior = actual;
                    } else {
                        nuevaCabeza.siguiente = actual;
                        actual.anterior.siguiente = nuevaCabeza;
                        actual.anterior = nuevaCabeza;
                    }
                } else {
                    if (actual.valor < nuevaCabeza.valor) {
                        actual.abajo = nuevaCabeza;
                        nuevaCabeza.arriba = actual;
                    } else {
                        nuevaCabeza.abajo = actual;
                        actual.arriba.abajo = nuevaCabeza;
                        actual.arriba = nuevaCabeza;
                    }
                }
            } else {
                if (esX) {
                    actual.siguiente = nuevaCabeza;
                    nuevaCabeza.anterior = actual;
                } else {
                    actual.abajo = nuevaCabeza;
                    nuevaCabeza.arriba = actual;
                }
            }
            return nuevaCabeza;
        }
        return cabeza;
    }

    buscarCabeza(valor, esX) {
        let actual = this.cabeza;
        while (actual) {
            if (actual.valor === valor) {
                return actual;
            } else {
                actual = esX ? actual.siguiente : actual.abajo;
            }
        }
        return undefined;
    }

    printCabeza(esX) {
        let actual = this.cabeza;
        let result = '';
        while (actual) {
            actual.imprimir(!esX);
            result += actual.valor + " --> ";
            actual = esX ? actual.siguiente : actual.abajo;
        }
        console.log(result);
    }

    reporte() {
        let cadena = "";
        let aux1 = this.cabeza;
        let aux2 = this.cabeza;
        let aux3 = this.cabeza;
        if (aux1 !== null) {
            cadena = "digraph MatrizCapa{  node[shape=box]  rankdir=UD;  {rank=min; ";
            /** Creacion de los nodos actuales */
            while (aux1) {
                cadena += "nodo" + (aux1.valorX ? aux1.valorX : "") + (aux1.valorY ? aux1.valorY : "") + "[label=\"" + aux1.valor + "\" ,rankdir=LR,group=" + (aux1.valor) + "]; ";
                aux1 = aux1.siguiente;
            }
            cadena += "}"
            while (aux2) {
                aux1 = aux2;
                cadena += "{rank=same; ";
                while (aux1) {
                    cadena += "nodo" + (aux1.valorX ? aux1.valorX : "") + (aux1.valorY ? aux1.valorY : "") + "[label=\"" + (aux1.valorX ? aux1.valorX : "") + (aux1.valorY ? aux1.valorY : "") + "\" ,group=" + (aux1.valorX) + "]; ";
                    aux1 = aux1.siguiente;
                }
                cadena += "}";
                aux2 = aux2.abajo;
            }
            /** Conexiones entre los nodos de la matriz */
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.siguiente) {
                    cadena += "nodo" + (aux1.valorX ? aux1.valorX : "") + (aux1.valorY ? aux1.valorY : "") + " -> " + "nodo" + (aux1.siguiente.valorX ? aux1.siguiente.valorX : "") + (aux1.siguiente.valorY ? aux1.siguiente.valorY : "") + " [dir=both]; "
                    aux1 = aux1.siguiente
                }
                aux2 = aux2.abajo;
            }
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.abajo) {
                    aux1.imprimir(false)
                    cadena += "nodo" + (aux1.valorX ? aux1.valorX : "") + (aux1.valorY ? aux1.valorY : "") + " -> " + "nodo" + (aux1.abajo.valorX ? aux1.abajo.valorX : "") + (aux1.abajo.valorY ? aux1.abajo.valorY : "") + " [dir=both]; "
                    aux1 = aux1.abajo
                }
                aux2 = aux2.siguiente;
            }
            cadena += "}";
        } else {
            cadena = "No hay elementos en la matriz"
        }
        return cadena;
    }
}

let matriz = new Matriz();

//insertar en X
matriz.insertarCabeza("A", true);
matriz.insertarCabeza("C", true);
matriz.insertarCabeza("E", true);
matriz.insertarCabeza("B", true);
matriz.insertarCabeza("A", true);
//matriz.printCabeza(true);

//insertar en Ymatriz.insertarCabeza("P", false);
matriz.insertarCabeza("R", false);
matriz.insertarCabeza("S", false);
matriz.insertarCabeza("R", false);
matriz.insertarCabeza("L", false);
matriz.insertarCabeza("P", false);
//matriz.printCabeza(false);

let cabezaY1 = matriz.insertarCabeza("R", false);
let nodoY1 = cabezaY1.insertarEnY("C", "R", cabezaY1);
//cabezaY1.imprimir(true);

let cabezaX1 = matriz.insertarCabeza("C", true);
cabezaX1.insertarEnX("R", nodoY1);
//cabezaX1.imprimir(false);

//insertar un valor especifico r, a
let cabezaY2 = matriz.insertarCabeza("R", false);
let nodoY2 = cabezaY2.insertarEnY("A", "R", cabezaY2);
//cabezaY2.imprimir(true);

let cabezaX2 = matriz.insertarCabeza("A", true);
cabezaX2.insertarEnX("R", nodoY2);
//cabezaXA.imprimir(false);

//insertar un valor especifico r, a
let cabezaY3 = matriz.insertarCabeza("S", false);
let nodoY3 = cabezaY3.insertarEnY("E", "S", cabezaY3);
//cabezaY2.imprimir(true);

let cabezaX3 = matriz.insertarCabeza("E", true);
cabezaX3.insertarEnX("S", nodoY3);
//cabezaXA.imprimir(false);

//insertar un valor especifico r, a
let cabezaY4 = matriz.insertarCabeza("R", false);
let nodoY4 = cabezaY4.insertarEnY("B", "R", cabezaY4);
//cabezaY2.imprimir(true);

let cabezaX4 = matriz.insertarCabeza("B", true);
cabezaX4.insertarEnX("R", nodoY4);
//cabezaXA.imprimir(false);

document.getElementById("ejemplo").innerHTML = matriz.reporte();

document.getElementById("image").src= 'https://quickchart.io/graphviz?graph=' + matriz.reporte();