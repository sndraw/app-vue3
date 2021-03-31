<template>
  <div class="about">
    <h1>indexedDB</h1>
    <div class="db-tip">数据统计：{{ dbList.length }}</div>
    <div class="db-btns">
      <button class="db-btn" @click="addRecord">新增</button>
    </div>
    <div class="db-table" v-if="!dbList || !dbList.length">暂无数据</div>
    <ul class="db-table" v-if="dbList && dbList.length">
      <template :key="index" v-for="(item, index) in dbList">
        <li class="db-table-item">
          <div class="item-left">
            <label>{{ index }}</label>
            <div>{{ item }}</div>
          </div>
          <div class="item-right">
            <button class="db-btn" @click="removeRecord(item.id)">删除</button>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";

import DB from "@/utils/indexedDB";
import autoGetName from "@/utils/autoGetName";
export default {
  name: "DB",
  setup() {
    let db = null; // 数据库
    const dbList = ref([]); // 数据列表
    const init = () => {
      const request = new DB().open("test", 1, "person");
      const storeName = "person";
      request.onerror = (event) => {
        console.log("打开DB失败", event);
      };
      request.onupgradeneeded = (event) => {
        db = event.target.result; /*数据库对象*/
        if (!db.objectStoreNames.contains(storeName)) {
          const objectStore = db.createObjectStore(storeName, {
            keyPath: "id",
          }); /*创建person仓库(表) 主键*/
          // objectStore = db.createObjectStore('person',{autoIncrement:true});/*自动创建主键*/
          objectStore.createIndex("name", "name", { unique: false });
          objectStore.createIndex("email", "email", { unique: false });
        }
        console.log("DB Upgrading", event.target.result);
      };
      request.onsuccess = (event) => {
        db = event.target.result; /*数据库对象*/
        console.log("成功打开DB", event.target.result);
        queryRecords();
      };
    };
    // const getRecord = (id) => {
    //   const request = db
    //     .transaction(["person"], "readwrite")
    //     .objectStore("person")
    //     .get(id);
    //   request.onsuccess = (event) => {
    //     if (request.result) {
    //       console.log("Id:" + request.result.key);
    //       console.log("Name" + request.result.name);
    //       console.log("Age" + request.result.age);
    //       console.log("Email" + request.result.email);
    //     } else {
    //       console.log("未获得数据记录", event.target.result);
    //     }
    //   };
    // };
    const queryRecords = () => {
      const objectStore = db.transaction(["person"]).objectStore("person");
      const records = [];
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          records.push(cursor.value);
          console.log("Id:" + cursor.key);
          console.log("Name:" + cursor.value.name);
          console.log("Age:" + cursor.value.age);
          console.log("Email:" + cursor.value.email);
          cursor.continue();
        } else {
          console.log(records);
          dbList.value = records;
          console.log("没有更多数据了");
        }
      };
    };
    const addRecord = () => {
      const data = {
        id: Math.random(),
        name: autoGetName(),
        age: Math.ceil(Math.random() * 100),
        email: "lisi@example.com",
      };
      const request = db
        .transaction(["person"], "readwrite")
        .objectStore("person")
        .add(data);
      request.onsuccess = (event) => {
        console.log("数据写入成功", event.target.result);
        queryRecords();
      };
      request.onerror = (event) => {
        console.log("数据写入失败", event.target.result);
      };
    };
    // const updateRecord = (data) => {
    //   const request = db
    //     .transaction(["person"], "readwrite")
    //     .objectStore("person")
    //     .put(data);
    //   request.onsuccess = (event) => {
    //     console.log("数据更新成功", event.target.result);
    //   };
    //   request.onerror = (event) => {
    //     console.log("数据更新失败", event.target.result);
    //   };
    // };
    const removeRecord = (id) => {
      const request = db
        .transaction(["person"], "readwrite")
        .objectStore("person")
        .delete(id);
      request.onsuccess = (event) => {
        console.log("数据删除成功", event.target.result);
        queryRecords();
      };
    };
    onMounted(() => {
      init();
    });
    return {
      dbList,
      addRecord,
      removeRecord,
    };
  },
};
</script>
<style lang="scss">
.about {
  width: 800px;
  margin: 0 auto;
  padding: 20px 20px;
}
.db-tip {
  padding: 10px 0;
  text-align: left;
}
.db-btns {
  padding: 10px 0;
  text-align: left;
}
.db-btn {
  padding: 5px 10px;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  background-color: #0a76d4;
  border: 1px solid #0a76d4;
  cursor: pointer;
  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 2px 5px #005bab;
    outline: none;
  }
}
.db-table {
  max-height: 400px;
  margin: 0 auto;
  padding: 20px 20px;
  border: 1px solid #adadad;
  overflow-x: auto;
  overflow-y: auto;
  .db-table-item {
    padding: 20px 0;
    display: flex;
    text-align: left;
    border-bottom: 1px dashed #adadad;
    &:last-child {
      border-bottom: none;
    }
    .item-left {
      flex: 1;
      white-space: pre-wrap;
    }
    // .item-right {
    //   // width: 100px;
    // }
  }
}
</style>
