package struct1

import "fmt"

type Nodo struct {
	next  *Nodo
	value int
}

func NewNodo(valor int) *Nodo {
	p := new(Nodo)
	p.value = valor
	return p
}

func InsertStart(valor int, nodo *Nodo) *Nodo {
	p := NewNodo(valor)
	p.next = nodo
	return p
}

func (r *Nodo) PrintAll() {
	fmt.Print(" -> ")
	fmt.Print(r.value)
	if r.next != nil {
		r.next.PrintAll()
	} else {
		fmt.Println()
	}
}

func (r *Nodo) InsertEnd(valor int) {
	if r.next == nil {
		r.next = NewNodo(valor)
	} else {
		r.next.InsertEnd(valor)
	}
}

func (r *Nodo) Size() int {
	if r.next == nil {
		return 1
	} else {
		return r.next.Size() + 1
	}
}

func Sort(nodo *Nodo, n int) {
	auxI := nodo
	var auxOld *Nodo
	for i := 0; i < n-1; i++ {
		auxJ := auxI.next
		for j := i + 1; j < n; j++ {
			if auxJ != nil && auxI.value > auxJ.value {
				intercambiar(auxI, auxJ, auxOld)
			}
			if auxJ != nil {
				auxJ = auxJ.next
			}
		}
		auxOld = auxI
		auxI = auxI.next
	}
}

func intercambiar(valueA *Nodo, valueB *Nodo, old *Nodo) {
	aux := valueA
	valueA = valueB
	valueB = aux

	valueB.next = valueA.next
	valueA.next = valueB

	if old != nil {
		old.next = valueA
	}
}

func DeleteStart(nodo *Nodo) *Nodo {
	return nodo.next
}

func (r *Nodo) DeleteEnd() {
	if r.next != nil {
		if r.next.next == nil {
			r.next = nil
		} else {
			r.next.DeleteEnd()
		}
	}
}
