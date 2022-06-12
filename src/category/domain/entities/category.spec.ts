import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import { UniqueEntityId } from "../../../shared/domain/value-objects/unique-entity-id.vo";

describe("Category tests", () => {
  test("constructor of category", () => {
    let category = new Category({
      name: "Movie",
    });

    let props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);
    let created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();

    category = new Category({
      name: "Movie",
      created_at,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    type CategoryData = {props: CategoryProperties; id?: UniqueEntityId}
    
    const data: CategoryData[] = [
      {props: { name: "Movie" }},
      {props: { name: "Movie" }, id: null},
      {props: { name: "Movie" }, id: undefined},
      {props: { name: "Movie" }, id: new UniqueEntityId()}
    ]

    data.forEach(i => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      expect(category.uniquntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("Getter of name field", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("Getter and setter of description field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "some description" });
    expect(category.description).toBe("some description");

    category = new Category({ name: "Movie" });
    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("Getter and setter of active prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();

    category = new Category({ name: "Movie" });
    category["is_active"] = true;
    expect(category.is_active).toBeTruthy();

    category["is_active"] = undefined;
    expect(category.is_active).toBeTruthy();
  });

  test("Getter of created_at", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);
  });

  test("update category", () => {
    let category = new Category({ name: "Movie", description: "Awesome movie" });
    const newName = "Tv Show";
    const newDescription = "Tv show description";

    category.update(newName, newDescription);

    expect(category.name).toBe(newName);
    expect(category.description).toBe(newDescription);

    category = new Category({ name: "Movie", description: "Awesome movie" });
    category.update(newName);
    expect(category.name).toBe(newName);
    expect(category.description).toBe("Awesome movie");

    category = new Category({ name: "Movie", description: "Awesome movie" });
    category.update(null, newDescription);
    expect(category.name).toBe("Movie");
    expect(category.description).toBe(newDescription);

  })

  test("Activate and deactivate category", () => {
    const category = new Category({ name: "Movie" });
    category.activate();
    expect(category.is_active).toBe(true);

    category.deactivate();
    expect(category.is_active).toBe(false);
  })
});
