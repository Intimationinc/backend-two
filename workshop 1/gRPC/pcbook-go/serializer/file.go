package serializer

import (
	"fmt"
	"os"

	"google.golang.org/protobuf/proto"
)

// WriteProtobufToJSONFile writes protocol buffer to JSON File
func WriteProtobufToJSONFile(messsage proto.Message, filename string) error {
	data, err := ProtobufToJSON(messsage)
	if err != nil {
		return fmt.Errorf("cant marshall proto message to JSON: %w", err)
	}

	err = os.WriteFile(filename, []byte(data), 0644)
	if err != nil {
		return fmt.Errorf("cant write JSON file: %w", err)
	}

	return nil
}

// WriteProtobufToBinaryFile writes protocol buffer message to binary file
func WriteProtobufToBinaryFile(message proto.Message, filename string) error {
	data, err := proto.Marshal(message)
	if err != nil {
		return fmt.Errorf("cant marshal (serialize) proto message to binary: %w", err)
	}

	err = os.WriteFile(filename, data, 0644) // File permission -> 0644
	if err != nil {
		return fmt.Errorf("cant write binary data to file %w", err)
	}

	return nil
}

func ReadProtobufToBinaryFile(filename string, message proto.Message) error {
	data, err := os.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("cant read binary data from file: %w", err)
	}

	// Deserialize binary data into protobuf message
	err = proto.Unmarshal(data, message)
	if err != nil {
		return fmt.Errorf("cant unmarshal binary data to proto message: %w", err)
	}

	return nil
}
