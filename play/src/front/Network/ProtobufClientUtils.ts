import { PositionMessage_Direction } from "@workadventure/messages";

export interface MucRoomDefinition {
    name: string;
    url: string;
    type: string;
}

export class ProtobufClientUtils {
    public static toDirectionString(direction: PositionMessage_Direction): "up" | "down" | "left" | "right" {
        switch (direction) {
            case PositionMessage_Direction.UP:
                return "up";
            case PositionMessage_Direction.DOWN:
                return "down";
            case PositionMessage_Direction.LEFT:
                return "left";
            case PositionMessage_Direction.RIGHT:
                return "right";
            default:
                throw new Error("Unexpected direction");
        }
    }

    public static toDirection(direction: string): PositionMessage_Direction {
        switch (direction) {
            case "up":
                return PositionMessage_Direction.UP;
            case "down":
                return PositionMessage_Direction.DOWN;
            case "left":
                return PositionMessage_Direction.LEFT;
            case "right":
                return PositionMessage_Direction.RIGHT;
            default:
                throw new Error("Unexpected direction string: " + direction);
        }
    }
}
