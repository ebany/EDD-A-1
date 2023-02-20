package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"

	"struct1"
)

func main() {
	start := struct1.NewNodo(5)
	fmt.Println(start)

	start.PrintAll()

	start.InsertEnd(8)
	start.InsertEnd(10)
	start.InsertEnd(6)
	start.InsertEnd(9)

	start.PrintAll()
	fmt.Println(start.Size())
	start = struct1.InsertStart(3, start)
	start = struct1.InsertStart(20, start)
	start.InsertEnd(1)
	start.PrintAll()

	fmt.Println(start.Size())

	start = struct1.Sort(start, start.Size())
	start.PrintAll()

	start = struct1.DeleteStart(start)
	start = struct1.DeleteStart(start)
	start.PrintAll()

	start.DeleteEnd()
	start.PrintAll()

	fmt.Println(start.Size())

	/*
		start = struct1.DeleteByValue(8, start)
		start.PrintAll()
		start = struct1.DeleteByValue(5, start)
		start.PrintAll()
		start = struct1.DeleteByValue(10, start)
		start.PrintAll()
	*/

	exit := true
	for exit {

		option := 0
		fmt.Println()
		fmt.Println("**************** Menu************")
		fmt.Println("1. agregar valor")
		fmt.Println("2. mostrar lista")
		fmt.Println("3. eliminar valor")
		fmt.Println("4. ingresar string")
		fmt.Println("5. graficar")
		fmt.Println("6. Salir")
		fmt.Print("******************Elige una opcion: ")

		fmt.Scanln(&option)

		switch option {
		case 1:
			var newValue int = 0
			fmt.Print("Ingrese el valor: ")
			fmt.Scanln(&newValue)
			start.InsertEnd(newValue)
			fmt.Println("Valor ingresado...")
		case 2:
			start = struct1.Sort(start, start.Size())
			start.PrintAll()
		case 3:
			var newValue int = 0
			fmt.Print("Ingrese el valor:")
			fmt.Scanln(&newValue)
			start = struct1.DeleteByValue(newValue, start)
			fmt.Println("Valor eliminado...")
		case 4:
			s := bufio.NewScanner(os.Stdin)
			var name string = ""

			for {
				fmt.Print("Please input your name: ")
				var err error
				name, err = scanString(s)
				if err == nil {
					name := strings.TrimSpace(name)
					min := 1
					if len(name) >= min {
						break
					}
					err = fmt.Errorf(
						"name must be at least %d characters",
						min,
					)
				}
				fmt.Println("input error:", err)
			}

			fmt.Println("Your name is:", name)
		case 5:
			start.Graficar()
			openImage()
		case 6:
			exit = false
		default:
			fmt.Println("Ingrese una opcíon válida")
		}

	}

}

func scanString(s *bufio.Scanner) (string, error) {
	if s.Scan() {
		return s.Text(), nil
	}
	err := s.Err()
	if err == nil {
		err = io.EOF
	}
	return "", err
}

func openImage() {
	path, _ := exec.LookPath("display")
	cmd, err := exec.Command(path, "lista.jpg").Output()
	if err != nil {
		fmt.Println("error: ", err)
	}
	fmt.Println("resultado: ", cmd)
}
