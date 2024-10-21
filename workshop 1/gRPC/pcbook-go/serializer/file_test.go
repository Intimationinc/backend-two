package serializer_test

import (
	"regain001/pcbook-go/pb"
	"regain001/pcbook-go/sample"
	"regain001/pcbook-go/serializer"
	"testing"

	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/proto"
)

func TestFileSerializer(t *testing.T) {
	t.Parallel()

	binaryFile := "../tmp/laptop.bin"
	jsonFile := "../tmp/laptop.json"

	laptop1 := sample.NewLaptop()
	err := serializer.WriteProtobufToBinaryFile(laptop1, binaryFile)
	require.NoError(t, err)

	err = serializer.WriteProtobufToJSONFile(laptop1, jsonFile)
	require.NoError(t, err)

	// define a new laptop2 object
	laptop2 := &pb.Laptop{}
	// pass laptop2 object for holding data which is converted from binaryFile
	err = serializer.ReadProtobufToBinaryFile(binaryFile, laptop2)
	require.NoError(t, err)
	require.True(t, proto.Equal(laptop1, laptop2))
}
