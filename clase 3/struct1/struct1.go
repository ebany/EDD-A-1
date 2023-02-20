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

func Sort(nodo *Nodo, n int) *Nodo {
	var start *Nodo = nodo

	auxI := nodo
	var auxOld *Nodo

	for auxI != nil {
		auxJ := auxI.next

		atStart := false
		for auxJ != nil {
			if auxJ != nil && auxI.value > auxJ.value {
				intercambiar(auxI, auxJ, auxOld)
				if auxOld == nil {
					auxI = auxJ
					atStart = true
				} else {
					auxI = auxOld
				}
				break
			}
			auxJ = auxJ.next
		}

		if !atStart {
			auxOld = auxI
			auxI = auxI.next
		} else {
			start = auxI
		}
		atStart = false

		if auxI == nil || auxI.next == nil {
			break
		}
	}

	return start
}

func intercambiar(valueI *Nodo, valueJ *Nodo, old *Nodo) {
	aux := valueI

	auxNextStart := valueI.next
	auxNextEnd := valueI.next

	for auxNextEnd.value != valueJ.value && auxNextEnd.next != nil && auxNextEnd.next.value != valueJ.value {
		auxNextEnd = auxNextEnd.next
	}

	valueI = valueJ
	valueJ = aux

	valueJ.next = valueI.next

	if auxNextStart.value != valueI.value {
		valueI.next = auxNextStart
	} else {
		valueI.next = valueJ
	}

	if auxNextEnd.value != valueI.value {
		auxNextEnd.next = valueJ
	}

	if old != nil {
		old.next = valueI
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

func DeleteByValue(value int, start *Nodo) *Nodo {
	if start.value == value {
		return start.next
	} else {
		start.next.deleteByValue(value, start)
		return start
	}
}

func (r *Nodo) deleteByValue(value int, before *Nodo) {
	if r.value == value {
		if before != nil {
			before.next = r.next
		}
	} else {
		r.next.deleteByValue(value, r)
	}
}
