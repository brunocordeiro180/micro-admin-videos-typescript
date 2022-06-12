import { UniqueEntityId } from "../domain/value-objects/unique-entity-id.vo";

export abstract class Entity<Props> {
  public readonly uniquntityId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniquntityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.uniquntityId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return { id: this.id, ...this.props } as Required<{ id: string } & Props>;
  }
}
