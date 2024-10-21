package serializer

import (
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"
)

// ProtobufToJSON converts protocol buffer message to JSON string
func ProtobufToJSON(message proto.Message) (string, error) {
	marshaller := protojson.MarshalOptions{
		EmitUnpopulated: false, // EmitUnpopulated specifies whether to emit unpopulated fields.
		Indent:          "  ",  // Pretty-print the output with indentation
		UseEnumNumbers:  false, // Set to true if you want enums as integers
		UseProtoNames:   true,  // ****Use original field names as defined in .proto file. You can change the value to see the changes
	}

	jsonBytes, err := marshaller.Marshal(message)
	if err != nil {
		return "", err
	}

	return string(jsonBytes), nil
}
