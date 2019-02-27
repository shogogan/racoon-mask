import { TestBed } from "@angular/core/testing";

import { RacoonService } from "./racoon.service";

describe("RacoonService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: RacoonService = TestBed.get(RacoonService);
        expect(service).toBeTruthy();
    });
});
