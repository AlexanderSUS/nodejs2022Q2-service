import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1685353558074 implements MigrationInterface {
  name = 'Migration1685353558074';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "track_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_9cc0e8a743e689434dac0130098" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_c6ec16b57b60c8096406808021d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_319a74c2085b42849b15412a3bf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_05ae9b9abba1cbe21e1cfc879f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "refreshTokenHash" character varying, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favourite_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_dca95621d075da187fdb0aec13a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_entity_albums_album_entity" ("favoriteEntityId" uuid NOT NULL, "albumEntityId" uuid NOT NULL, CONSTRAINT "PK_ffe5cbc0543aaf18edd1acf7df4" PRIMARY KEY ("favoriteEntityId", "albumEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23620a1116e547b2c0cba391ad" ON "favorite_entity_albums_album_entity" ("favoriteEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_91162b6e706398bb082f2dfd45" ON "favorite_entity_albums_album_entity" ("albumEntityId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_entity_artists_artist_entity" ("favoriteEntityId" uuid NOT NULL, "artistEntityId" uuid NOT NULL, CONSTRAINT "PK_48c85ca5f47103cf20f930c5c39" PRIMARY KEY ("favoriteEntityId", "artistEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_54793d88ad3aa6164089906bee" ON "favorite_entity_artists_artist_entity" ("favoriteEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e37dc678b224b0a9c7e48292e9" ON "favorite_entity_artists_artist_entity" ("artistEntityId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_entity_tracks_track_entity" ("favoriteEntityId" uuid NOT NULL, "trackEntityId" uuid NOT NULL, CONSTRAINT "PK_4753bfc81c76fc8677091a344d0" PRIMARY KEY ("favoriteEntityId", "trackEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f49b4ae7fc3658e0c27b205bb3" ON "favorite_entity_tracks_track_entity" ("favoriteEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_921fc03f6efe5b268b636a15f6" ON "favorite_entity_tracks_track_entity" ("trackEntityId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favourite_entity_albums_album_entity" ("favouriteEntityId" uuid NOT NULL, "albumEntityId" uuid NOT NULL, CONSTRAINT "PK_62f5ea36bedb5deae4d317f2e85" PRIMARY KEY ("favouriteEntityId", "albumEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31ae9604c3ce30cb68114eed54" ON "favourite_entity_albums_album_entity" ("favouriteEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_684c48cfd9601565d5b4f90785" ON "favourite_entity_albums_album_entity" ("albumEntityId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favourite_entity_artists_artist_entity" ("favouriteEntityId" uuid NOT NULL, "artistEntityId" uuid NOT NULL, CONSTRAINT "PK_533bb3059e0c7a81f5af5e3ca1c" PRIMARY KEY ("favouriteEntityId", "artistEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bef537919687fad11067aae316" ON "favourite_entity_artists_artist_entity" ("favouriteEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9964d9f20d42588a27a171e49c" ON "favourite_entity_artists_artist_entity" ("artistEntityId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favourite_entity_tracks_track_entity" ("favouriteEntityId" uuid NOT NULL, "trackEntityId" uuid NOT NULL, CONSTRAINT "PK_22a6f8632e6fdea936580a4ec70" PRIMARY KEY ("favouriteEntityId", "trackEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_74adcd830207815c371510dbc2" ON "favourite_entity_tracks_track_entity" ("favouriteEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cbf4b1c92e406088c38350407d" ON "favourite_entity_tracks_track_entity" ("trackEntityId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "FK_f75df6098780938c05b7a65d2ca" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" ADD CONSTRAINT "FK_4aea5943406bd89eced202b012b" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_albums_album_entity" ADD CONSTRAINT "FK_23620a1116e547b2c0cba391ad0" FOREIGN KEY ("favoriteEntityId") REFERENCES "favorite_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_albums_album_entity" ADD CONSTRAINT "FK_91162b6e706398bb082f2dfd454" FOREIGN KEY ("albumEntityId") REFERENCES "album_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_artists_artist_entity" ADD CONSTRAINT "FK_54793d88ad3aa6164089906beea" FOREIGN KEY ("favoriteEntityId") REFERENCES "favorite_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_artists_artist_entity" ADD CONSTRAINT "FK_e37dc678b224b0a9c7e48292e93" FOREIGN KEY ("artistEntityId") REFERENCES "artist_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_tracks_track_entity" ADD CONSTRAINT "FK_f49b4ae7fc3658e0c27b205bb37" FOREIGN KEY ("favoriteEntityId") REFERENCES "favorite_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_tracks_track_entity" ADD CONSTRAINT "FK_921fc03f6efe5b268b636a15f63" FOREIGN KEY ("trackEntityId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_albums_album_entity" ADD CONSTRAINT "FK_31ae9604c3ce30cb68114eed54c" FOREIGN KEY ("favouriteEntityId") REFERENCES "favourite_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_albums_album_entity" ADD CONSTRAINT "FK_684c48cfd9601565d5b4f90785a" FOREIGN KEY ("albumEntityId") REFERENCES "album_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_artists_artist_entity" ADD CONSTRAINT "FK_bef537919687fad11067aae316f" FOREIGN KEY ("favouriteEntityId") REFERENCES "favourite_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_artists_artist_entity" ADD CONSTRAINT "FK_9964d9f20d42588a27a171e49c2" FOREIGN KEY ("artistEntityId") REFERENCES "artist_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_tracks_track_entity" ADD CONSTRAINT "FK_74adcd830207815c371510dbc2a" FOREIGN KEY ("favouriteEntityId") REFERENCES "favourite_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_tracks_track_entity" ADD CONSTRAINT "FK_cbf4b1c92e406088c38350407d8" FOREIGN KEY ("trackEntityId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_tracks_track_entity" DROP CONSTRAINT "FK_cbf4b1c92e406088c38350407d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_tracks_track_entity" DROP CONSTRAINT "FK_74adcd830207815c371510dbc2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_artists_artist_entity" DROP CONSTRAINT "FK_9964d9f20d42588a27a171e49c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_artists_artist_entity" DROP CONSTRAINT "FK_bef537919687fad11067aae316f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_albums_album_entity" DROP CONSTRAINT "FK_684c48cfd9601565d5b4f90785a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_entity_albums_album_entity" DROP CONSTRAINT "FK_31ae9604c3ce30cb68114eed54c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_tracks_track_entity" DROP CONSTRAINT "FK_921fc03f6efe5b268b636a15f63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_tracks_track_entity" DROP CONSTRAINT "FK_f49b4ae7fc3658e0c27b205bb37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_artists_artist_entity" DROP CONSTRAINT "FK_e37dc678b224b0a9c7e48292e93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_artists_artist_entity" DROP CONSTRAINT "FK_54793d88ad3aa6164089906beea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_albums_album_entity" DROP CONSTRAINT "FK_91162b6e706398bb082f2dfd454"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_entity_albums_album_entity" DROP CONSTRAINT "FK_23620a1116e547b2c0cba391ad0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" DROP CONSTRAINT "FK_4aea5943406bd89eced202b012b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "FK_f75df6098780938c05b7a65d2ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cbf4b1c92e406088c38350407d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_74adcd830207815c371510dbc2"`,
    );
    await queryRunner.query(
      `DROP TABLE "favourite_entity_tracks_track_entity"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9964d9f20d42588a27a171e49c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bef537919687fad11067aae316"`,
    );
    await queryRunner.query(
      `DROP TABLE "favourite_entity_artists_artist_entity"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_684c48cfd9601565d5b4f90785"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31ae9604c3ce30cb68114eed54"`,
    );
    await queryRunner.query(
      `DROP TABLE "favourite_entity_albums_album_entity"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_921fc03f6efe5b268b636a15f6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f49b4ae7fc3658e0c27b205bb3"`,
    );
    await queryRunner.query(`DROP TABLE "favorite_entity_tracks_track_entity"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e37dc678b224b0a9c7e48292e9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_54793d88ad3aa6164089906bee"`,
    );
    await queryRunner.query(
      `DROP TABLE "favorite_entity_artists_artist_entity"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_91162b6e706398bb082f2dfd45"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_23620a1116e547b2c0cba391ad"`,
    );
    await queryRunner.query(`DROP TABLE "favorite_entity_albums_album_entity"`);
    await queryRunner.query(`DROP TABLE "favourite_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TABLE "favorite_entity"`);
    await queryRunner.query(`DROP TABLE "album_entity"`);
    await queryRunner.query(`DROP TABLE "artist_entity"`);
    await queryRunner.query(`DROP TABLE "track_entity"`);
  }
}
