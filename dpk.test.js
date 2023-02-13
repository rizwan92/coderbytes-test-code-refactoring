const { deterministicPartitionKey } = require("./dpk");


describe("deterministicPartitionKey", () => {
  it("should return the partitionKey if it is present in the event object", () => {
    const event = { partitionKey: "123" };
    expect(deterministicPartitionKey(event)).toBe("123");
  });

  it("should return the hashed string if the event object doesn't contain partitionKey", () => {
    const event = { data: "some data" };
    expect(deterministicPartitionKey(event)).toMatch(/^[a-f0-9]{128}$/);
  });

  it("should return the hashed string if the candidate is not a string", () => {
    const event = { partitionKey: 123 };
    expect(deterministicPartitionKey(event)).toMatch(/^[a-f0-9]{128}$/);
  });

  it("should return the hashed string if the length of candidate is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const event = {
      partitionKey: "a".repeat(257),
    };
    expect(deterministicPartitionKey(event)).toMatch(/^[a-f0-9]{128}$/);
  });

  it("should return the TRIVIAL_PARTITION_KEY if event is not passed", () => {
    expect(deterministicPartitionKey()).toBe("0");
  });
});