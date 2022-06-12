import { validate } from "uuid";
import { InvalidUuidError } from "../../../errors/invalid-uuid.error";
import { UniqueEntityId } from "../unique-entity-id.vo";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniquyEntityId Unit tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => {
      new UniqueEntityId("fake id");
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept uuid passed in the constructor", () => {
    const uuid = "8a2ccd75-888d-4fcc-9a02-e016ec650b86";

    const vo = new UniqueEntityId(uuid);
    const validateSpy = spyValidateMethod();

    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it(" ", () => {
    const vo = new UniqueEntityId();
    const validateSpy = spyValidateMethod();
    expect(validate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
