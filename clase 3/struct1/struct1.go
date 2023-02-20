package struct1

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"strconv"
)

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

func crearArchivoDot(nombre_archivo string) {
	//Verifica que el archivo existe
	var _, err = os.Stat(nombre_archivo)
	//Crea el archivo si no existe
	if os.IsNotExist(err) {
		var file, err = os.Create(nombre_archivo)
		if err != nil {
			return
		}
		defer file.Close()
	}
	fmt.Println("Archivo creado exitosamente", nombre_archivo)
}

func escribirArchivoDot(contenido string, nombre_archivo string) {
	// Abre archivo usando permisos READ & WRITE
	var file, err = os.OpenFile(nombre_archivo, os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(contenido)
	if err != nil {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if err != nil {
		return
	}
	fmt.Println("Archivo actualizado existosamente.")
}

func ejecutar(nombre_imagen string, archivo_dot string) {
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tjpg", archivo_dot).Output()
	mode := 0777
	_ = ioutil.WriteFile(nombre_imagen, cmd, os.FileMode(mode))
}

func (r *Nodo) Graficar() {
	fmt.Println("Impresion")
	nombre_archivo_dot := "./lista.dot"
	nombre_imagen := "lista.jpg"
	texto := "digraph lista{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record];\n"
	texto += "nodonull1[label=\"null\"];\n"
	texto += "nodonull2[label=\"null\"];\n"
	auxiliar := r
	contador := 0
	for i := 0; i < r.Size(); i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"{|" + "valor: " + ", " + strconv.Itoa(auxiliar.value) + "|}\"];\n"
		auxiliar = auxiliar.next
	}
	texto += "nodonull1->nodo0 [dir=back];\n"
	for i := 0; i < r.Size()-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(c) + ";\n"
		texto += "nodo" + strconv.Itoa(c) + "->nodo" + strconv.Itoa(i) + ";\n"
		contador = c
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
	texto += "}"

	crearArchivoDot(nombre_archivo_dot)
	escribirArchivoDot(texto, nombre_archivo_dot)
	ejecutar(nombre_imagen, nombre_archivo_dot)

}
