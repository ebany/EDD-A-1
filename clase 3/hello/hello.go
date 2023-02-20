package main

import (
	"fmt"

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

}
